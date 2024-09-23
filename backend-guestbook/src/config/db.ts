import mongoose from 'mongoose';
import 'dotenv/config';

export async function connectDB() {
    try {
        await mongoose.connect(process.env['MONGO_URI']!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
}

// Optional: Ping function to check if the database connection is working
export async function ping() {
    try {
        const db = mongoose.connection;
        if (db.readyState === 1) {
            console.log('MongoDB is alive and reachable');
        } else {
            console.log('MongoDB connection state:', db.readyState);
        }
    } catch (error) {
        console.error('Error pinging MongoDB:', error);
    }
}
