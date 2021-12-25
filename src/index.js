import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config';
import dbConfig from './config/database';
import passport from './config/passport';
import { catchErrors, notFound } from './middlewares/errors';
import auth from './routes/auth';
import words from './routes/words';
import panelWords from './routes/panelWords';

dotenv.config({ path: '.env' });

passport();

mongoose.connect(dbConfig.mongoUrl, dbConfig.settings);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection open');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit();
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_TOKEN));

// rate limiting
if (config.env === 'production') {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    });

    app.use(limiter);
}

// routes config
app.use('/api/words', words());
app.use('/api/auth', auth());
app.use('/api/panel/words', panelWords());

// errors handling
app.use(notFound);
app.use(catchErrors);

app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
});
