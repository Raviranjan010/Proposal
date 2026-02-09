
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// MongoDB Schema
const ProposalSchema = new mongoose.Schema({
    answers: {
        type: Map,
        of: String
    },
    proposalResponse: String,
    message: String,
    contact: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

let Proposal;

// Prevent overwriting model if already compiled
try {
    Proposal = mongoose.model('Proposal');
} catch {
    Proposal = mongoose.model('Proposal', ProposalSchema);
}

// Optimization: Reuse MongoDB connection (Global Cache for Serverless)
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        console.log('Using existing MongoDB connection');
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        };

        console.log('Creating new MongoDB connection...');
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            console.log('MongoDB connected successfully');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('MongoDB connection error:', e);
        throw new Error(`Database connection failed: ${e.message}`);
    }

    return cached.conn;
}

export default async function handler(req, res) {
    console.log('API Route hit: /api/submit');
    console.log('Method:', req.method);

    // Check for Environment Variables
    if (!process.env.MONGODB_URI) {
        console.error('Missing MONGODB_URI');
        return res.status(500).json({ message: 'Server Configuration Error: Missing Database Connection String' });
    }
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Missing Email Configuration');
        return res.status(500).json({ message: 'Server Configuration Error: Missing Email Credentials' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        console.log('Connecting to database...');
        await connectToDatabase();
        console.log('Database connected successfully.');

        const { answers, proposalResponse, message, contact } = req.body;
        console.log('Received data:', { proposalResponse, message, contact, answersReceived: !!answers });

        // Save to MongoDB
        console.log('Saving to MongoDB...');
        const newProposal = new Proposal({
            answers,
            proposalResponse,
            message,
            contact,
        });

        await newProposal.save();
        console.log('Saved to MongoDB.');

        // Send Email (Best Effort)
        let emailSent = false;
        try {
            console.log('Sending email...');
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            // Format Email Content
            let formattedMessage = "💌 New Message from Contact Website\n\n";

            // Add Questionnaire Answers
            if (answers && typeof answers === 'object') {
                Object.entries(answers).forEach(([key, value]) => {
                    if (key !== 'proposalResponse') {
                        formattedMessage += `Question: ${key}\nAnswer: ${value}\n\n`;
                    }
                });
            }

            formattedMessage += `Will you go out with me?\nResponse: ${proposalResponse || 'No response'}\n\n`;
            formattedMessage += `📝 Final Words:\n${message}\n\n`;
            formattedMessage += `📞 Contact Info:\n${contact}`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'raviranjan01b@gmail.com', // Explicitly set to your email
                subject: 'New Proposal Response! 💖',
                text: formattedMessage,
            };

            await transporter.sendMail(mailOptions);
            emailSent = true;
            console.log('Email sent successfully.');
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // We do NOT throw here; we want to return success because DB save worked.
        }

        res.status(200).json({
            message: 'Success!',
            emailSent,
            warning: emailSent ? null : 'Proposal saved, but email notification failed.'
        });

    } catch (error) {
        console.error('Detailed Error:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
