export default function authHeader() {
  const employer = JSON.parse(localStorage.getItem("employer"));
  const student = JSON.parse(localStorage.getItem("student"));

  if (employer && employer.accessToken) {
    return { "x-access-token": employer.accessToken };
  } else if (student && student.accessToken) {
    return { "x-access-token": student.accessToken };
  } else {
    return {};
  }
}
