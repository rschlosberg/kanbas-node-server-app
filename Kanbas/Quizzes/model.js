import mongoose from "mongoose";
import {quizAttemptSchema, quizSchema} from "./schema.js";
const quizModel = mongoose.model("QuizModel", quizSchema);
const quizAttemptModel = mongoose.model("QuizAttemptModel", quizAttemptSchema);

export {quizModel, quizAttemptModel};