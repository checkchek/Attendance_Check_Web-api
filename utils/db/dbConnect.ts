import mongoose from "mongoose";

async function dbConnect() {
  mongoose.connect("mongodb://127.0.0.1:27017/attendance");
  mongoose.set("strictQuery", true);

  const handleOpen = () => console.log("Connected to DB");
  const db = mongoose.connection;
  db.on("error", (error) => console.log("DB Error", error));
  db.once("open", handleOpen);
}

export default dbConnect;
