const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require("./db/connectToDb");

require("dotenv").config;

// Middleware ______________________

const corsOptions = {
    origin: 'http://localhost:3000', // frontend URI (ReactJS)
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// _________________________________

// Connect to MongoDB ______________

connectToDb();

// _________________________________

// Routes __________________________

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Connected to Backend successfully."
    });
})

// _________________________________

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// _________________________________
