const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const app = require("./app");
const mongoose = require("mongoose");

const port = 5000;

startServer();
async function startServer() {
  try {
    // attempts to connect to MongoDB using the URI from environment variables
    // The 'await' keyword pauses execution until the connection is established or fails
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!"); // Log successful database connection

    // starts the express.js application, making it listen for incoming requests on the defined port
    app.listen(port, () => {
      console.log(`Server is currently running on port ${port}`);
    });
  } catch (error) {
    // catch any errors that occur during the database connection or server startup
    console.error("Failed to connect to MongoDB or start server:", error);
    // Exit the process with an error code if connection fails,
    // as the application cannot run without the database.
    process.exit(1);
  }
}
