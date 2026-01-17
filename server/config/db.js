const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        if (err.message.includes('ENOTFOUND')) {
            console.log('👉 Error: Your Cluster address in .env is incorrect!');
        } else if (err.message.includes('Authentication failed')) {
            console.log('👉 Error: Your Username or Password in .env is incorrect!');
        }
        process.exit(1);
    }
};

module.exports = connectDB;
