import mongoose, { Schema, model, models } from "mongoose";

interface ILecture {
  name: string;
  students: string[];
}

const lectureSchema = new Schema<ILecture>({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Lecture = models.Lecture || model<ILecture>("Lecture", lectureSchema);
export default Lecture;
