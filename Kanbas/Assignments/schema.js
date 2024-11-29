import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    points: { type: Number, min: 0 },
    due: String, 
    available: String, 
    until: String, 
    description: String
  },
  { collection: "assignments" }
);
export default schema;