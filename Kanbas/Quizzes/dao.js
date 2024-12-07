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

function calculateTotalPoints(quiz){
    let totalPointsWorth = 0;

    quiz.questions?.forEach((q) => {
        totalPointsWorth += Number(q.pointsWorth) || 0;
    })
    return totalPointsWorth;
}

// create quiz for course
export function createQuiz(quiz) {
  const newQuiz = { ...quiz };
  newQuiz.points = calculateTotalPoints(newQuiz);
  return quizModel.create(newQuiz)
}

// edit quiz
export function updateQuiz(quizId, quizUpdates) {
    const newQuizUpdates = { ...quizUpdates };
    newQuizUpdates.points = calculateTotalPoints(newQuizUpdates);
    //return quizModel.updateOne({ _id: quizId}, newQuizUpdates);
    return quizModel.findOneAndUpdate(
        { _id: quizId },
        { $set: newQuizUpdates },
        { returnOriginal: false },
    );
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
export async function createQuizAttempt(quizAttempt) {
    const quiz = await quizModel.findById(quizAttempt.quiz);
    let pointsEarned = 0;

    quizAttempt.answers.forEach(async (answer) => {
        const question = quiz.questions.find(
            (q) => q._id.toString() === answer.questionId.toString()
        );

        if (question) {
        const correctAnswers = question.correctAnswers.map((ans) => ans.toLowerCase());

        if (correctAnswers.includes((answer.answer || "").toLowerCase())) {
            pointsEarned += Number(question.pointsWorth) || 0;
            answer.isCorrectAnswer = true;
        } else {
            answer.isCorrectAnswer = false;
        }


    } else {
        // Handle if question not found (optional)
        console.warn(`Question not found for answer ${answer.questionId}`);
    }
    })
    quizAttempt.pointsEarned = pointsEarned;
    const newAttempt = await quizAttemptModel.create(quizAttempt)
    return newAttempt;
}

// get the user's most recent quiz attempt for a specific quiz
export function getQuizAttempts(quizId, userId) {
  return quizAttemptModel
    .find({ quiz: quizId, user: userId })
    .sort({ attempt: -1 })
    .exec();
}




