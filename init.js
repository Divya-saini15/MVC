const mongoose = require("mongoose");
const User = require("./models/User"); // Import the User model from the appropriate file
const { faker } = require("@faker-js/faker");

mongoose
  .connect("mongodb://localhost:27017/MVC", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Connected to MongoDB");
    createFakeUsers();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

async function createFakeUsers() {
  try {
    // // Clear existing users
    // await User.deleteMany({});

    // Create 50 fake users
    const fakeUsers = [];
    for (let i = 0; i < 50; i++) {
      const fakeUser = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        phone: 78445167892,
      };
      fakeUsers.push(fakeUser);
    }

    await User.insertMany(fakeUsers);
    console.log("Fake users created successfully");
    process.exit(0); // Exit the process after creating fake users
  } catch (err) {
    console.error("Failed to create fake users", err);
    process.exit(1); // Exit the process with an error code
  }
}
