import Database from "../Database/index.js";
export function enrollUserInCourse(enrollment) {
  const { enrollments } = Database;
  enrollments.push(enrollment);
}

export function deleteEnrollment(userId, courseId) {
 const { enrollments } = Database;
 Database.enrollments = enrollments.filter((enrollment) => (enrollment.user !== userId && enrollment.course !== courseId));
}
