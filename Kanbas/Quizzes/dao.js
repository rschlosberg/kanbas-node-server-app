import {quizModel, quizAttemptModel} from "./model.js"

// QUIZ MODEL

//FACULTY
// get list of all quizzes associated with selected course
export function findQuizzesForCourse(courseId) {
  return quizModel.find({ course: courseId });
}

// get list of published courses for students
export function findPublishedQuizzesForCourse(courseId) {
  return quizModel.find({ course: courseId, published: true });
}

// create quiz for course
export function createQuiz(quiz) {
  delete quiz._id
  return quizModel.create(quiz)
}

// edit quiz
export function updateQuiz(quizId, quizUpdates) {
    return quizModel.updateOne({ _id: quizId}, quizUpdates);
}

// delete quiz
export function deleteQuiz(QuizId) {
    return quizModel.deleteOne({ _id: QuizId });
}

//STUDENT:

// get list of PUBLISHED quizzes associated with course student
// is enrolled in and has selected

// QUIZ ATTEMPT MODEL

// post quiz attempt
export function createQuizAttempt(quizId, quizAttempt) {
  delete quizAttempt._id
  return quizAttemptModel.create(quizId)
}

// get the user's most recent quiz attempt for a specific quiz
export function getMostRecentQuizAttempt(quizId, userId) {
  return quizAttemptModel
    .findOne({ quiz: quizId, user: userId })
    .sort({ attempt: -1 })
    .exec();
}




