// ===== Overview page script =====

let livePosts = 63;                                  // number shown in the "Live job posts" box
let employees = ["Staff member 1", "Staff member 2"]; // an array of employee names

// Verify / Reject / Approve buttons (onclick, getElementById, innerHTML, style, if / else)
function decide(id, answer) {
  let cell = document.getElementById(id);
  cell.innerHTML = answer;

  if (answer == "Verified" || answer == "Approved") {
    cell.style.color = "#3FB8A0";   // green
  } else {
    cell.style.color = "#FBBF24";   // yellow
  }

  if (answer == "Approved") {
    livePosts++;                    // one more live post
    document.getElementById("live-posts").innerHTML = livePosts;
  }
}

// Save fee form (onsubmit, .value, if / else, return false)
function saveFee() {
  let fee = document.getElementById("fee").value;
  let message = document.getElementById("fee-message");

  if (fee == "" || fee < 1) {
    message.innerHTML = "Fee must be 1 or more";
    message.style.color = "red";
  } else {
    message.innerHTML = "Fee saved: " + fee;
    message.style.color = "#3FB8A0";
  }
  return false;                     // stay on the page
}

// Add employee form (array includes / push, createElement, appendChild)
function addEmployee() {
  let name = document.getElementById("emp").value;
  let message = document.getElementById("emp-message");

  if (name == "") {
    message.innerHTML = "Employee name must be filled out";
    message.style.color = "red";
    return false;
  }

  if (employees.includes(name)) {
    message.innerHTML = name + " is already in the list";
    message.style.color = "red";
    return false;
  }

  employees.push(name);

  const row = document.createElement("div");
  row.className = "list-row";
  row.innerHTML = "<span>" + name + "</span><span class='tag'>New</span>";
  document.getElementById("employee-list").appendChild(row);

  message.innerHTML = name + " added";
  message.style.color = "#3FB8A0";
  document.getElementById("emp").value = "";
  return false;
}