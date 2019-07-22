const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

// Init Middleware
// bodyParser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/accounts', require('./routes/api/accounts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
