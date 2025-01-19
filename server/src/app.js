import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.middleware.js';
import http from 'http';
import multer from 'multer';
import { Server } from 'socket.io';
import uploadRoutes from './routes/uploadRoutes.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:4000', 'https://globalcircleedu.com', 'https://globalcircleedu.netlify.app'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// CORS configuration
const allowedOrigins = ['https://globalcircleedu.com', 'https://globalcircleedu.tagobuy.site', 'https://globalcircleedu.netlify.app', 'https://fascinating-liger-1082c0.netlify.app', 'http://localhost:5173', 'https://fascinating-liger-1082c0.netlify.app'];

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
app.use('/images/photos', express.static('images/photos'));
app.use(cookieParser());
app.use('/', uploadRoutes);

const upload = multer();
app.use(upload.any());

app.get('/', (req, res) => {
    res.send('Welcome to Global Circle Edu Server V:1.0');
});

// Import routes
import settingsRoutes from './routes/settings.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import visitorRouter from './routes/visitor.routes.js';
import courseRouter from './routes/course.routes.js';
import universityRouter from './routes/university.routes.js';
import newsRouter from './routes/news.routes.js';
import jobRouter from './routes/job.routes.js';
import degreeRouter from './routes/degree.routes.js';
import programRouter from './routes/program.routes.js';
import serviceRoutes from './routes/service.routes.js';
import feeRoutes from './routes/fee.routes.js';
import adminRoutes from './routes/admin.routes.js';
import agentRoutes from './routes/agent.routes.js';
import chatRoutes from './routes/chat.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import billingRoutes from './routes/billing.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import teamMemberRoutes from './routes/teamMember.routes.js';


// Route declaration
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/visitor", visitorRouter);

app.use("/course", courseRouter);
app.use("/universities", universityRouter);
app.use("/news", newsRouter);
app.use("/job", jobRouter);
app.use("/degree", degreeRouter);
app.use("/program", programRouter);
app.use('/service', serviceRoutes)
app.use('/fees', feeRoutes);
app.use("/admin", adminRoutes);
app.use("/agent", agentRoutes);
app.use("/chat", chatRoutes);
app.use("/payment", paymentRoutes);
app.use("/billing", billingRoutes);
app.use('/settings', settingsRoutes);
app.use('/testimonials', testimonialRoutes);
app.use('/team-members', teamMemberRoutes);



// Add this route before the catch-all handler
app.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = `${process.cwd()}/images/photos/${filename}`;
    console.log('Requested file:', filePath);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status || 500).json({ success: false, error: err.message });
        } else {
            console.log('File sent successfully:', filePath);
        }
    });
});
// Catch-all for unhandled routes
app.use('*', (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Error middleware should be used after all routes
app.use(errorMiddleware);


// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


export { app, server };
