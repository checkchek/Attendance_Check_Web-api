import {
  Model,
  Document,
  Schema,
  model,
  models,
  Types,
  HydratedDocument,
} from "mongoose";
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
  name: string;
  students: HydratedDocument<IUser>[];
  attendance: IAttendance;
}

const lectureSchema = new Schema<ILecture>({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  attendance: Object,
});

const Lecture = model<ILecture>("Lecture", lectureSchema);
export default Lecture;
