import app from "./app.js";
import { connection } from "./data/user.js";

app.listen(process.env.PORT, () =>
  console.log("app is working on port " + process.env.PORT)
);
connection();
