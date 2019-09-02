const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

// Init Middleware
// bodyParser
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/accounts', require('./routes/api/accounts'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (res, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
