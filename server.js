const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const User = require('./models/User');
const { seedDatabase, ensureDemoUsers } = require('./seeder/seedData');

// Load env vars
dotenv.config();

// Initialize app
const app = express();

// Connect to Database and auto-seed if empty
const initDB = async () => {
  await connectDB();
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('⚡ No users found in database. Automatically initializing demo dataset...');
      await seedDatabase(false);
    } else {
      console.log(`✅ Database ready. Found ${userCount} existing users.`);
      // Guarantee all 5 demo roles exist even with pre-existing collections
      await ensureDemoUsers();
    }
  } catch (err) {
    console.error('Error during auto-seed check:', err.message);
  }
};

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Community Rescue & Reuse Platform API',
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/deliveries', require('./routes/deliveryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/traveller', require('./routes/travellerRoutes'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let server = null;

const startServer = async () => {
  try {
    await initDB();
    server = app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 Community Rescue API Server running on port ${PORT}`);
      console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Failed to initialize server:', err.message);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

module.exports = app;
