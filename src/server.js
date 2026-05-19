import express from "express";
import { config  } from "dotenv";
import { connectDB, disconnectDB } from "./routes/config/db.js";

// import routes
import productsRoute from "./routes/productsRoute.js";

config();
connectDB();

const app = express();
// API routes
app.use("/user", productsRoute);


const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Server Running on port : ${PORT}`);
})
 

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});