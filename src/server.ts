import dataSource from "./config/database";
import app from "./routes";

dataSource
  .initialize()
  .then(() => {
    console.log("PostgresDB Connected...");
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
    process.exit(1);
  });

// connectDB();

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
