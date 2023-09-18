import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const api = require('./controllers/index');
const srartApi = require('./controllers/login');
const passport = require('passport');
const app = express();
const port = process.env.APP_PORT || 8080;
require("dotenv").config();
require("./auth/passport");

app.use(
    cors({
    //   allowHeaders: '*',
    //   allowMethods: '*',
      origin: 'http://localhost:8100',
      credentials: true,
    })
  );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
app.use(express.json());

const authMiddleware = (req:any, res:any, next:any) => {
    passport.authenticate("jwt", { session: false }, (err:any, user:any, info:any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Clear the cookie if the user is unauthorized
        res.clearCookie("auth-token");
        res.clearCookie("userId");
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    })(req, res, next);
};
app.get('/', (req:any, res:any) => {
    res.status(200).json("Welcome to my World");
});
// app.use('/api', authMiddleware, api);
app.use('/api', api);
app.use('/api-login', srartApi);

const server = http.createServer(app);
const MONGO_URL = "mongodb+srv://leeson1519:leeson1519@mndb.hvpx0th.mongodb.net/ManageMoneydb?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => {
    console.log('Mongodb connected.');
    server.listen(port, () => {
        console.log(`Server is runing on port: ${port}`);
    });
}).catch((err) => console.log(err));
mongoose.connection.on('error', (error:any) => console.log(error));

app.use(errorHandler);
app.use(notFound);