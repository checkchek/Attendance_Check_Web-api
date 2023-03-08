import { Model, Schema, model, models } from "mongoose";

export interface IUser {
  name: string;
  std: boolean;
  num: string;
  id: string;
  pw: string;
  lectures: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  std: { type: Boolean, required: true },
  num: { type: String, required: true },
  id: { type: String, required: true },
  pw: { type: String, required: true },
  lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
