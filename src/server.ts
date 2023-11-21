import dataSource from "./config/database";
import app from "./routes";

const port = app.get("port");

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    console.log("PostgresDB Connected...");
  })
  .then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
    process.exit(1);
  });
