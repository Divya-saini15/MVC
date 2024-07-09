const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MVC', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

// Parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import and use routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require ('./routes/authRoutes')
app.use('/users', userRoutes);
app.use('/auth', authRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));