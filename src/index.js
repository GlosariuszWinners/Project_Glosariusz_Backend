import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import './config/database';
import dbConfig from './config/database';
import { catchErrors, notFound } from './middlewares/errors';
import words from './routes/words';

mongoose.connect(dbConfig.mongoUrl, dbConfig.settings);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection open');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit();
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes config
app.use('/api/words', words());

// errors handling
app.use(notFound);
app.use(catchErrors);

app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
});
