const dotenv = require('dotenv');
// Load environment variables from config.env file
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connection successful');
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
