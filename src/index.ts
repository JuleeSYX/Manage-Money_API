import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
const api = require('./controllers/index');
const app = express();
app.use(cors({
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: any, res: any) => {
    res.status(200).json("Welcome to my World");
})
app.use('/api', api);


const server = http.createServer(app);
const MONGO_URL = "mongodb+srv://leeson1519:leeson1519@mndb.hvpx0th.mongodb.net/ManageMoneydb?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => {
    console.log('Mongodb connected.');
    server.listen('8080', () => {
        console.log('Server running on http://localhost:8080/');
    });
}).catch((err) => console.log(err));
mongoose.connection.on('error', (error: Error) => console.log(error));