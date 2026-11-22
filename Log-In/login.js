// ===== JobBridge login page script =====
// Same pattern as the validateForm() example in the slides
function validateForm() {
  let role = document.querySelector('input[name="role"]:checked').value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let message = document.getElementById("message");

  // an array of objects: one object for each account
  const accounts = [
    { role: "admin", email: "admin@jobbridge.com", password: "admin123", page: "../admin/Admin_dashboard.html" },
    { role: "employee", email: "employee@jobbridge.com", password: "employee123", page: "../employee/Employee_dashboard.html" }
  ];

  // 1. empty fields
  if (email == "" || password == "") {
    message.innerHTML = "Email and password must be filled out";
    message.style.color = "red";
    return false;
  }

  // 2. look for a matching account
  for (const acc of accounts) {
    if (acc.role == role && acc.email == email && acc.password == password) {
      document.getElementById("loginForm").action = acc.page;
      return true;   // the form is sent to this page
    }
  }

  // 3. nothing matched
  message.innerHTML = "Wrong email or password";
  message.style.color = "red";
  return false;      // the form is not sent
} 