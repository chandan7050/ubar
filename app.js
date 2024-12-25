const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectToDb = require('./config/dbConnect');
const userRoute = require("./routes/UserRoutes");
const captainRoute = require('./routes/CaptainRoutes')
const cookies = require('cookie-parser')
const mapRoutes = require('./routes/MapRoute')
const rideRoute = require('./routes/RideRoute')

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use(cookies());



app.get('/', (req,res) => {
    res.send('Hello, World!');
});

app.use('/users',userRoute);
app.use('/captains', captainRoute);
app.use('/maps',mapRoutes);
app.use('/rides',rideRoute);



module.exports = app