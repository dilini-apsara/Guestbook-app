import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import {authMiddleware} from "./middleware/authMiddleware";



// Load environment variables from .env file
dotenv.config();

const app = express(); // Initialize the express app
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI!;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/posts', authMiddleware, postRoutes);



// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Guestbook API is running' });
});

// MongoDB Connection and Server Start
async function startServer() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log('MongoDB connected successfully');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit with failure if there's an error
    }
}

// Start the server and connect to the database
startServer();
