// example neo4j code, save for now
// const neo4j = require("neo4j-driver");
//
// const driver = neo4j.driver(
//   "bolt://localhost:7687",
//   neo4j.auth.basic("neo4j", "your_password"),
// );
// const session = driver.session();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Import routes
const indexRouter = require("./routes/index");

// Use routes
app.use("/", indexRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// example neo4j code, save for now
// async function runQuery() {
//   try {
//     const result = await session.run("MATCH (n:Person) RETURN n");
//
//     result.records.forEach((record) => {
//       console.log(record.get("n").properties);
//     });
//   } finally {
//     await session.close();
//   }
//
//   // Close the driver
//   await driver.close();
// }
//
// runQuery().catch((error) => {
//   console.error("Error:", error);
// });
