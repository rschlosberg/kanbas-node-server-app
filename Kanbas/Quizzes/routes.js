import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    // QUIZ ATTEMPTS
    const createQuizAttempt = async (req, res) => {
        const quizAttempt = req.body;
        const newQuizAttempt = await dao.createQuizAttempt(quizAttempt);
        res.send(newQuizAttempt)
    }
    app.post("/api/quizzes/attempts", createQuizAttempt)

    const getQuizAttempts = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const { quizId } = req.params;
        const attempts = await dao.getQuizAttempts(quizId, currentUser._id)
        res.json(attempts);
    }
    app.get("/api/quizzes/:quizId/attempts", getQuizAttempts)

    // GET QUIZZES

    const getAllQuizzes = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            return res.sendStatus(401); // Unauthorized
        }

        const { courseId } = req.params;
        let quizzes;

        try {
            if (currentUser.role === "FACULTY") {
                // Faculty can view all quizzes
                quizzes = await dao.findQuizzesForCourse(courseId);
            } else {
                // Students can view only published quizzes
                quizzes = await dao.findPublishedQuizzesForCourse(courseId);
            }
            res.json(quizzes);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            res.status(500).send({ error: "Failed to fetch quizzes." });
        }
    };

    app.get("/api/courses/:courseId/quizzes", getAllQuizzes);

    // POST QUIZ
    const createNewQuiz = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const { courseId } = req.params;
        const quiz = {
            ...req.body,
            course: courseId,
            owner: currentUser._id
        };
        const newQuiz = await dao.createQuiz(quiz);
        res.send(newQuiz)
     }

     app.post("/api/courses/:courseId/quizzes", createNewQuiz)


     // UPDATE QUIZ

    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status =  await dao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    });

    // DELETE QUIZ

    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.deleteQuiz(quizId);
        res.send(status);
    });




}