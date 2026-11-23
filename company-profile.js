const jobs = [
    { id: "JOB-101", title: "Junior Web Developer", type: "Full-Time", department: "Software", vacancies: 2, salary: 40000 },
    { id: "JOB-102", title: "QA & Testing Intern", type: "Internship", department: "QA", vacancies: 3, salary: 15000 }
];
let nextId = 103;

const tableBody = document.getElementById("jobsTableBody");
const jobCount = document.getElementById("jobCount");
const msg = document.getElementById("formMessage");
const terms = document.getElementById("Condition");
const submitBtn = document.getElementById("submitBtn");

function renderJobs() {
    tableBody.innerHTML = "";

    for (const job of jobs) {
        const tr = document.createElement("tr");
        tr.innerHTML = "<td>" + job.id + "</td><td>" + job.title + "</td><td>" + job.type + "</td><td>" + job.department + "</td><td>" + job.vacancies + "</td><td>" + job.salary + "</td>";
        tableBody.appendChild(tr);
    }

    jobCount.innerHTML = "Total Posted Jobs: " + jobs.length;
}

terms.addEventListener("change", function () {
    submitBtn.disabled = !terms.checked;
});

function validateForm() {
    const title = document.getElementById("JobTitle").value.trim();
    const vacancies = Number(document.getElementById("Vacancy").value);
    const salary = Number(document.getElementById("Salary").value);

    if (title === "" || vacancies < 1 || vacancies > 50 || salary < 5000) {
        msg.innerHTML = "Error: Enter a valid title, vacancies (1-50), and salary (min 5000).";
        msg.style.color = "red";
        return false;
    }

    const radios = document.getElementsByName("JobType");
    let jobType = "Full-Time";
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) jobType = radios[i].value;
    }

    const boxes = document.getElementsByName("JobDept");
    const depts = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) depts.push(boxes[i].value);
    }

    if (depts.length === 0) {
        msg.innerHTML = "Error: Select at least one Hiring Department.";
        msg.style.color = "red";
        return false;
    }

    const newJob = { id: "JOB-" + nextId++, title: title, type: jobType, department: depts.join(", "), vacancies: vacancies, salary: salary };
    jobs.push(newJob);
    console.log("New Job:", newJob);

    renderJobs();
    msg.innerHTML = "Success: " + newJob.title + " posted!";
    msg.style.color = "green";

    document.getElementById("JobTitle").value = "";
    document.getElementById("Vacancy").value = "";
    document.getElementById("Salary").value = "";
    for (let i = 0; i < boxes.length; i++) boxes[i].checked = false;
    terms.checked = false;
    submitBtn.disabled = true;

    return false;
}

document.getElementById("resetBtn").addEventListener("click", function () {
    msg.innerHTML = "";
    submitBtn.disabled = true;
});

renderJobs();