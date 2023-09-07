const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path')
const morgan = require('morgan')
const globalError = require("./middlewares/ErrorMiddleware");
const userRoutes = require('./routes/user')
const bloodTypeRoutes = require('./routes/bloodType')
const authRoutes = require("./routes/auth");
const bloodRequestRoutes = require('./routes/bloodRequest');
const sendEmail = require('./utils/sendEmail');
dotenv.config();

const app = new express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


// routes
app.use('/users', userRoutes);
app.use('/blood-type', bloodTypeRoutes);
app.use('/auth', authRoutes);
app.use('/blood-request', bloodRequestRoutes);




app.use(cors());
app.use(morgan('dev'))


app.use(globalError)


















app.use('/', express.static(path.join(__dirname, 'uploads')))




const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

