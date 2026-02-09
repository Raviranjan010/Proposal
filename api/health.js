
import mongoose from 'mongoose';

// Reusing the connection logic would be ideal, but for a simple health check, 
// we can keep it self-contained or import a shared db module if we had one.
// For now, we'll check env vars and attempt a lightweight connection if not connected.

export default async function handler(req, res) {
    const status = {
        status: 'ok',
        env: {
            mongodb: !!process.env.MONGODB_URI,
            email: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS
        },
        database: 'disconnected',
        timestamp: new Date().toISOString()
    };

    try {
        if (mongoose.connection.readyState === 1) {
            status.database = 'connected';
        } else {
            // Try to connect (with short timeout)
            if (process.env.MONGODB_URI) {
                await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
                status.database = 'connected';
            }
        }
    } catch (error) {
        status.database = 'error';
        status.error = error.message;
        res.status(500).json(status);
        return;
    }

    res.status(200).json(status);
}
