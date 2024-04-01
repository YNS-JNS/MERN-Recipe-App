const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require("./src/configs/db.config");
const logger = require("morgan");
const userRoutes = require("./src/routes/user.routes");
const { notFound, globalErrhandler } = require("./src/middlewares/errorMiddleware");

require("dotenv").config;

const PORT = process.env.PORT || 4000;

// Middleware ______________________

const corsOptions = {
    origin: 'http://localhost:3000', // frontend URI (ReactJS)
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(logger("dev"));

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


app.use("/api/v1/users", userRoutes);

// Error handler middleware ________

app.use(notFound);
app.use(globalErrhandler);

// _________________________________

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// _________________________________
