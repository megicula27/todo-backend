import mongoose from "mongoose";

export const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todoDB",
    })
    .then((c) => {
      console.log("Connected to MongoDB with connection: " + c.connection.host);
    })
    .catch((err) => {
      console.log(err);
    });
};
