import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:4000', 'https://tagobuy.net', 'https://www.tagobuy.net'];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to Global Circle Edu Server');
});

// Import routes
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

// Route declaration
app.use("/users", userRouter);
app.use("/auth", authRouter);


// Catch-all for unhandled routes
app.use('*', (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Error middleware should be used after all routes
app.use(errorMiddleware);


export { app };
