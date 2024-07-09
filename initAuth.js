// scripts/createTestUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userAuth = require('./models/UserAuth');

mongoose.connect('mongodb://localhost/chat_app', { useNewUrlParser: true, useUnifiedTopology: true });

async function createTestUser() {
  const hashedPassword = await bcrypt.hash('divyasaini007', 10);
  const testUser = new userAuth({
    username: 'divyasaini',
    password: hashedPassword
  });

  try {
    await testUser.save();
    console.log('Test user created successfully');
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    mongoose.disconnect();
  }
}

createTestUser();