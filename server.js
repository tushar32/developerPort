const express = require('express');
const connectDB = require('./config/db');

//@route GET  api/users
//router.get('/',(req,res) => res.send('User route'));

const app = express();

//connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

//Define Routes
app.use('/api/users',users); 
//This is our route middleware
// e.g.
///api/users
///api/users/:id

app.use('/api/auth',auth);
app.use('/api/posts',posts);
app.use('/api/profile',profile);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));