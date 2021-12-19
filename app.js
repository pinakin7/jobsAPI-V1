require("dotenv").config();
require("express-async-errors");


// adding security layer
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');



const express = require("express");
const app = express();

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const authUser = require("./middleware/authentication");

app.use(express.json());

// calling the security middleware
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15*60*1000,
    max: 100,
}));

app.use(helmet());
app.use(cors());
app.use(xss());







// routes
app.use("/api/v1/auth", authRouter);
// adding the user authentication middleware before accessing the jobs router
app.use("/api/v1/jobs", authUser,jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {

        await connectDB(process.env.MONGO_URI);

        console.log('Connected to database');

        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );

    } 
    
    catch (error) {
        console.error(error);
    }
};

start();
