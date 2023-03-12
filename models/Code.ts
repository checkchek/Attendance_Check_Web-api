import { Model, Schema, model, models } from "mongoose";

export interface ICode {
  time: number;
  code: string;
}

const codeSchema = new Schema<ICode>({
  code: { type: String, required: true },
  time: { type: Number, required: true },
});

const Code = models.Code || model<ICode>("Code", codeSchema);

export default Code;
