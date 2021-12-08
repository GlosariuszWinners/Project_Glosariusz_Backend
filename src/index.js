import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { join } from 'path';
import config from './config/config';
import './config/database';
import dbConfig from './config/database';
import { catchErrors, notFound } from './middlewares/errors';
import words from './routes/words';

mongoose.connect(dbConfig.mongoUrl);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
	console.error(`MongoDB connection error: ${err}`);
	process.exit();
});

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes config
app.use('/api/words', words());

// errors handling
app.use(notFound);
app.use(catchErrors);

app.listen(config.server.port, () => {
	console.log(`Server is running on port ${config.server.port}`);
});
