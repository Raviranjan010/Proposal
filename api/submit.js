
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

// Optimization: Reuse MongoDB connection
let isConnected = false;

async function connectToDatabase() {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Database connection failed');
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await connectToDatabase();

        const { answers, proposalResponse, message, contact } = req.body;

        // Save to MongoDB
        const newProposal = new Proposal({
            answers,
            proposalResponse,
            message,
            contact,
        });

        await newProposal.save();

        // Configure Nodemailer
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
        // Since 'answers' is an object here, we iterate keys
        if (answers && typeof answers === 'object') {
            Object.entries(answers).forEach(([key, value]) => {
                if (key !== 'proposalResponse') { // Skip if it's separate
                    formattedMessage += `Question: ${key}\nAnswer: ${value}\n\n`;
                }
            });
        }

        formattedMessage += `Will you go out with me?\nResponse: ${proposalResponse || 'No response'}\n\n`;
        formattedMessage += `📝 Final Words:\n${message}\n\n`;
        formattedMessage += `📞 Contact Info:\n${contact}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            //   to: 'raviranjankashyap7@gmail.com', // Replace with your email or use environment variable
            to: 'raviranjan01b@gmail.com',
            subject: 'New Proposal Local Response!',
            text: formattedMessage,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Success! Proposal saved and email sent.' });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
