const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const bookingRouter = require('./routes/bookingRouter');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE'
}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/findbookingdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define routes
app.use('/user', userRouter);
app.use('/booking', bookingRouter);

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
