import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    owner: {  type: mongoose.Schema.Types.ObjectId, ref: "UserModel"  },
    published: { type: Boolean, default: false},
    questions: [
        {
            type: {
                type: String,
                enum: ["MULTIPLE CHOICE", "TRUE/FALSE", "FILL IN THE BLANK"], 
                default: "MULTIPLE CHOICE"
            },
            questionText: String,
            multipleChoiceOptions: [String], 
            correctAnswers: [String],
            pointsWorth: Number
        }
    ],
    dueDate: { type: Date },
    availableStartDate: { type: Date },
    availableUntilDate: { type: Date },
    points: { type: Number, min: 0 },
    quizType: {
        type: String,
        enum: ["GRADED QUIZ", "PRACTICE QUIZ", "GRADED SURVEY", "UNGRADED SURVEY"],
        default: "GRADED QUIZ",
    },
    assignmentGroup: {
        type: String,
        enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
        default: "QUIZZES",
    },
    shuffleQuestions: {
        type: Boolean,
        default: true,
    },
    timeLimit: {
        type: Number,
        default: 20
    },
    multipleAttempts: {
        type: Boolean,
        default: false,
    },
    howManyAttempts:{
        type: Number, 
        default: 1
    },
    showCorrectAnswers: {
        type: Boolean, 
        default: false
    },
    accessCode: {
        type: String, 
        default: ""
    },
    oneQuestionAtATime: {
        type: Boolean, 
        default: true
    }, 
    webcamRequired: {
        type: Boolean, 
        default: false
    }, 
    lockQuestionsAfterAnswering: {
        type: Boolean, 
        default: false
    }
  },
  { collection: "quizzes" }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz.questions",
            },
        answer: String,
        }
    ],
    pointsEarned: Number,
    attempt: {
        type: Date,
        default: Date.now,
    }   
  },
  { collection: "quizAttempts" }
);


export {quizSchema, quizAttemptSchema};