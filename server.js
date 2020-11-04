const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const Plans = require('./models/Plan');
//Connect Database
connectDB()

//Initialization (only run for first time)
const freePlan = {};
freePlan.package = 'free';
freePlan.price = 0.00;
freePlan.features = ["customizable sheet playlist", "music sheet and chords in pdf", "30 music sheet and chords", "24/7 live support"];

const premiumPlan = {};
premiumPlan.package = 'premium';
premiumPlan.price = 29.99;
premiumPlan.features = ["customizable sheet playlist", "music sheet and chords in pdf", "online music editor", "enjoy 3 online instruments class", "100 music sheet and chords", "24/7 live support"];

const ultimatePlan = {};
ultimatePlan.package = 'ultimate';
ultimatePlan.price = 39.99;
ultimatePlan.features = ["customizable sheet playlist", "music sheet and chords in pdf", "online music editor (Pro)", "unlimited to every music sheet and chords", "unlimited online instrument class", "24/7 live support"];

app.use(express.json({ extended: false }));
app.use(cors());
app.get("/", async (req, res) => {
    try {
        let plans = [{ package: freePlan.package, price: freePlan.price, features: freePlan.features },
        { package: premiumPlan.package, price: premiumPlan.price, features: premiumPlan.features },
        { package: ultimatePlan.package, price: ultimatePlan.price, features: ultimatePlan.features }];

        await Plans.insertMany(plans)
        res.json({ msg: "good to go" })
    } catch (error) {
        console.error("error in posting moongose", error.message);
        res.status(500).send("Server Error")
    }
});

app.use("/plans", require("./routes/plan"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running at port ${PORT}`) })