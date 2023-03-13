import { Document, Schema, model, models, HydratedDocument } from "mongoose";
import { IUser } from "./User";

/* example Attendance
  -1: 미확인, 0: 출석, 1: 지각, 2: 결석
  {
    20183063: [0,0,0,0,0,1,2,0,-1,-1,-1],
    20183064: [0,0,1,0,0,1,0,0,-1,-1,-1]
    ...
  }
*/
export interface IAttendance {
  [key: string]: number[];
}

export interface ILecture extends Document {
  id: number;
  name: string;
  students: HydratedDocument<IUser>[];
  attendance: IAttendance;
  days: string[];
  startTime: string;
  endTime: string;
}

const lectureSchema = new Schema<ILecture>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  attendance: Object,
  days: [{ type: String, required: true }],
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const Lecture = models.Lecture || model<ILecture>("Lecture", lectureSchema);
export default Lecture;
