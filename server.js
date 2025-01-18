const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const referralRoutes = require('./routes/referralRoutes');
const { initSocket } = require('./socket/socket');
const cors = require('cors');
const http = require('http')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/referral', referralRoutes);


// Initialize socket
const server = http.createServer(app)
initSocket(app, server);

// Start server
server.listen(5000, () => {
    console.log('Server running on port 5000');
});


