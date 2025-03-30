const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { seedRootUser } = require("./controllers/authController");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/user.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/menu", require("./routes/menu.route"));
app.use("/api/orders", require("./routes/order.route"));

// Export the app object for testing
if (require.main === module) {
  connectDB();
  // Seed the root user if necessary
  seedRootUser();
  // If the file is run directly, start the server
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
