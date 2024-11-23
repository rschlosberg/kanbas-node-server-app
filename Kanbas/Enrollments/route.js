import * as enrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app) {

 app.delete("/api/modules/:moduleId", (req, res) => {
   const { enrollmentId } = req.params;
   const status = enrollmentsDao.deleteEnrollment(enrollmentId);
   res.send(status);
 });
}
