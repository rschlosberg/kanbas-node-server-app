import * as enrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app) {

app.post("/api/courses/enrollments", (req, res) => {
  const enrollment = req.body; // Expecting userId in the 
  console.log(enrollment)
  const status = enrollmentsDao.enrollUserInCourse(enrollment);
  res.send(status);
});

app.delete("/api/courses/enrollments/:userId/:courseId", (req, res) => {
  const { userId, courseId } = req.params;
  const status = enrollmentsDao.deleteEnrollment(userId, courseId);
  res.send(status);
});
}
