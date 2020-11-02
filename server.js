const express = require('express');
const app = express();
const connectDB = require('./config/db');
const Plans = require('./models/Plan');
//Connect Database
connectDB()

//Initialization (only run for first time)
const plansFields = {};
plansFields.package = 'free';
plansFields.price = 0.00;
plansFields.features = ["feature 1", "feature 2", "feature 3"];



app.use(express.json({ extended: false }))

app.get("/", async (req, res) => {
    try {
        let plans = new Plans(plansFields);
        await plans.save();
        res.json(plans)
    } catch (error) {
        console.error("error in posting moongose", error.message);
        res.status(500).send("Server Error")
    }
});

app.use("/plan", require("./routes/plan"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running at port ${PORT}`) })