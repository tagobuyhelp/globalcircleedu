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
app.use('/images', express.static('images'));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to Global Circle Edu Server');
});

// Import routes
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import visitorRouter from './routes/visitor.routes.js';
import courseRouter from './routes/course.routes.js';;
import universityRouter from './routes/university.routes.js';
import newsRouter from './routes/news.routes.js';
import jobRouter from './routes/job.routes.js';
import degreeRouter from './routes/degree.routes.js';
import programRouter from './routes/program.routes.js';

// Route declaration
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/visitor", visitorRouter);
app.use("/course", courseRouter);
app.use("/university", universityRouter);
app.use("/news", newsRouter);
app.use("/job", jobRouter);
app.use("/degree", degreeRouter);
app.use("/program", programRouter);


// Catch-all for unhandled routes
app.use('*', (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Error middleware should be used after all routes
app.use(errorMiddleware);


export { app };
