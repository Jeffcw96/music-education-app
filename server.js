const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const PriceSchema = require('./models/Price');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.get("/", async (req, res) => {
//     try {
//         const Premium = mongoose.model('premium', PriceSchema);
//         const Ultimate = mongoose.model('ultimate', PriceSchema);
//         let premiumPlans = [{ duration: 1, price: 29.99 }, { duration: 2, price: 49.99 }, { duration: 6, price: 139.99 }];
//         let ultimatePlans = [{ duration: 1, price: 39.99 }, { duration: 2, price: 55.55 }, { duration: 6, price: 185.55 }];

//         await Premium.insertMany(premiumPlans);
//         await Ultimate.insertMany(ultimatePlans);
//         res.json({ msg: "good to go" })
//     } catch (error) {
//         console.error("error in posting moongose", error.message);
//         res.status(500).send("Server Error")
//     }
// });

app.use("/plans", require("./routes/plan"));
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/payment", require("./routes/payment"));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running at port >>> ${PORT}`) })