
// =================================
// 1. JOB INFORMATION
// =================================
const jobs = [
    {
        id: 1,
        title: "Sales Assistant",
        company: "Northwind Retail",
        location: "Dhaka",
        type: "Full-time",
        salary: "15000 - 20000 BDT",
        minAge: 18,
        maxAge: 30,
        education: ["BBA", "CSE", "English", "Economics"],
        workers: 3,
        skills: ["Communication", "Excel"]
    },
    {
        id: 2,
        title: "Graphic Design Intern",
        company: "Brightline Studio",
        location: "Remote",
        type: "Internship",
        salary: "8000 - 12000 BDT",
        minAge: 18,
        maxAge: 26,
        education: ["CSE", "BBA", "Other"],
        workers: 2,
        skills: ["Figma", "Photoshop", "Graphic Design"]
    },
    {
        id: 3,
        title: "Delivery Rider",
        company: "Swift Logistics",
        location: "Chattogram",
        type: "Part-time",
        salary: "10000 - 15000 BDT",
        minAge: 20,
        maxAge: 35,
        education: ["BBA", "CSE", "English", "EEE", "Other"],
        workers: 10,
        skills: ["Communication", "Teamwork"]
    },
    {
        id: 4,
        title: "Junior Web Developer",
        company: "Tech Solutions",
        location: "Dhaka",
        type: "Full-time",
        salary: "20000 - 30000 BDT",
        minAge: 20,
        maxAge: 30,
        education: ["CSE"],
        workers: 4,
        skills: ["HTML", "CSS", "JavaScript", "Programming"]
    },
    {
        id: 5,
        title: "Customer Support Executive",
        company: "Easy Services",
        location: "Remote",
        type: "Full-time",
        salary: "12000 - 18000 BDT",
        minAge: 18,
        maxAge: 32,
        education: ["BBA", "CSE", "English", "Economics"],
        workers: 5,
        skills: ["Communication", "English", "Teamwork"]
    },
    {
        id: 6,
        title: "Data Entry Operator",
        company: "Digital Office",
        location: "Dhaka",
        type: "Part-time",
        salary: "10000 - 14000 BDT",
        minAge: 18,
        maxAge: 28,
        education: ["BBA", "CSE", "English", "Economics", "EEE"],
        workers: 3,
        skills: ["Excel", "Word"]
    },
    {
        id: 7,
        title: "Marketing Assistant",
        company: "Smart Marketing",
        location: "Dhaka",
        type: "Full-time",
        salary: "15000 - 22000 BDT",
        minAge: 21,
        maxAge: 35,
        education: ["BBA", "English", "Economics"],
        workers: 2,
        skills: ["Communication", "Teamwork"]
    }
];
// =================================
// 2. SELECT HTML ELEMENTS
// =================================
let cvForm = document.getElementById("cvForm");
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let field = document.getElementById("field");
let skills = document.getElementById("skills");
let cvFile = document.getElementById("cvFile");
let comment = document.getElementById("comment");
let cvMessage = document.getElementById("cvMessage");
let cvProfile = document.getElementById("cvProfile");
let searchInput = document.getElementById("searchInput");
let jobList = document.getElementById("jobList");
let jobCount = document.getElementById("jobCount");
let jobFilter = document.getElementById("jobFilter");
let logoutBtn = document.getElementById("logoutBtn");
// =================================
// 3. STORE CV INFORMATION
// =================================
let currentCV = null;
let appliedJobs = [];
// =================================
// 4. CHECK JOB ELIGIBILITY
// =================================
function checkEligibility(job) {
    if (currentCV === null) {
        return false;
    }
    let ageMatch =
        currentCV.age >= job.minAge &&
        currentCV.age <= job.maxAge;
    let educationMatch =
        job.education.includes(currentCV.field);
    let skillMatch =
        job.skills.some(function(skill) {
            return currentCV.skills.includes(skill);
        });
    return ageMatch && educationMatch && skillMatch;
}
// =================================
// 5. DISPLAY ALL JOBS
// =================================
function displayJobs(jobData) {
    jobList.innerHTML = "";
    jobCount.innerHTML = jobData.length + " jobs found";
    if (jobData.length === 0) {
        jobList.innerHTML =
            '<p class="no-jobs">No jobs found.</p>';
        return;
    }
    jobData.forEach(function(job) {
        let isApplied = appliedJobs.includes(job.id);
        let eligible = checkEligibility(job);
        let jobHTML = `
            <div class="job-item">
                <div class="job-details">
                    <h4>${job.title}</h4>
                    <p>
                        ${job.company} · ${job.location}
                    </p>
                    <p>
                        ${job.type} · Salary: ${job.salary}
                    </p>
                    <p>
                        Age: ${job.minAge} - ${job.maxAge} years
                    </p>
                    <p>
                        Education: ${job.education.join(", ")}
                    </p>
                    <div class="tags">
                        ${job.skills.map(function(skill) {
                            return `<span class="tag">${skill}</span>`;
                        }).join("")}
                    </div>
                    <p class="eligibility ${
                        currentCV === null ? "" :
                        eligible ? "eligible-text" : "not-eligible-text"
                    }">
                        ${
                            currentCV === null
                            ? "Publish your CV to check eligibility."
                            : eligible
                            ? "You are eligible for this job."
                            : "Not eligible: Age, education or skills do not match."
                        }
                    </p>
                </div>
                <button
                    class="apply-btn"
                    data-id="${job.id}"
                    ${(!eligible || isApplied) ? "disabled" : ""}>
                    ${
                        isApplied ? "Applied" :
                        eligible ? "Apply with my CV" : "Not Eligible"
                    }
                </button>
            </div>
        `;
        jobList.innerHTML += jobHTML;
    });
    // Apply Button Events
    let applyButtons = jobList.querySelectorAll(".apply-btn");
    applyButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            let jobId = Number(button.getAttribute("data-id"));
            applyForJob(jobId);
        });
    });
}
// =================================
// 6. CV FORM VALIDATION
// =================================
cvForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let nameValue = fullName.value.trim();
    let emailValue = email.value.trim();
    let phoneValue = phone.value.trim();
    let ageValue = Number(age.value);
    let fieldValue = field.value;
    let commentValue = comment.value.trim();
    let file = cvFile.files[0];
    // Check empty fields
    if (
        nameValue === "" ||
        emailValue === "" ||
        phoneValue === "" ||
        fieldValue === "" ||
        !file
    ) {
        showMessage("Please fill in all required fields.", "error");
        return;
    }
    // Check phone number
    if (!/^01[3-9]\d{8}$/.test(phoneValue)) {
        showMessage("Please enter a valid Bangladeshi phone number.", "error");
        return;
    }
    // Check age
    if (ageValue < 16 || ageValue > 100 || age.value === "") {
        showMessage("Please enter a valid age.", "error");
        return;
    }
    // Get selected skill
    let skillValues = [skills.value];
    if (skills.value === "") {
        showMessage("Please select a skill.", "error");
        return;
    }
    // Check CV file type
    let fileName = file.name.toLowerCase();
    if (
        !fileName.endsWith(".pdf") &&
        !fileName.endsWith(".doc") &&
        !fileName.endsWith(".docx")
    ) {
        showMessage("Only PDF, DOC or DOCX files are allowed.", "error");
        return;
    }
    // Check CV file size
    if (file.size > 5 * 1024 * 1024) {
        showMessage("CV file must be smaller than 5 MB.", "error");
        return;
    }
    // Store CV Information
    currentCV = {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        age: ageValue,
        field: fieldValue,
        skills: skillValues,
        fileName: file.name,
        comment: commentValue
    };
    showMessage(
        "Your CV has been published successfully!",
        "success"
    );
    // Show Published CV Information
    cvProfile.innerHTML = `
        <h4>Published CV</h4>
        <p>Name: ${currentCV.name}</p>
        <p>Email: ${currentCV.email}</p>
        <p>Phone: ${currentCV.phone}</p>
        <p>Age: ${currentCV.age}</p>
        <p>Study: ${currentCV.field}</p>
        <p>Skills: ${currentCV.skills.join(", ")}</p>
        <p>CV File: ${currentCV.fileName}</p>
        <p>Comment: ${currentCV.comment || "No comment added"}</p>
        <h4 class="eligibility">Job Eligibility</h4>
    `;
    // Count eligible jobs
    let eligibleCount = jobs.filter(function(job) {
        return checkEligibility(job);
    }).length;
    cvProfile.innerHTML += `
        <p>You are eligible for ${eligibleCount} out of ${jobs.length} jobs.</p>
    `;
    console.log("Published CV:", currentCV);
    displayJobs(jobs);
});
// =================================
// 7. SHOW MESSAGE
// =================================
function showMessage(message, type) {
    cvMessage.innerHTML = message;
    cvMessage.className = "message " + type;
}
// =================================
// 8. LIVE JOB SEARCH
// =================================
function searchJobs() {
    let searchValue = searchInput.value.toLowerCase().trim();
    let filteredJobs = jobs.filter(function(job) {
        let jobInfo = (
            job.title + " " +
            job.company + " " +
            job.location + " " +
            job.type + " " +
            job.education.join(" ") + " " +
            job.skills.join(" ")
        ).toLowerCase();
        return jobInfo.includes(searchValue);
    });
    // Eligible Jobs Filter
    if (jobFilter.value === "eligible") {
        filteredJobs = filteredJobs.filter(function(job) {
            return checkEligibility(job);
        });
    }
    displayJobs(filteredJobs);
}
searchInput.addEventListener("input", searchJobs);
jobFilter.addEventListener("change", searchJobs);
// =================================
// 9. APPLY FOR A JOB
// =================================
function applyForJob(jobId) {
    // Check whether CV is published
    if (currentCV === null) {
        alert("Please publish your CV first.");
        return;
    }
    // Check whether already applied
    if (appliedJobs.includes(jobId)) {
        alert("You have already applied for this job.");
        return;
    }
    // Find Selected Job
    let selectedJob = jobs.find(function(job) {
        return job.id === jobId;
    });
    if (selectedJob && checkEligibility(selectedJob)) {
        appliedJobs.push(jobId);
        alert("Successfully applied for " + selectedJob.title);
        console.log("Application:", {
            job: selectedJob.title,
            applicant: currentCV.name,
            CV: currentCV.fileName
        });
        searchJobs();
    }
}
// =================================
// 10. LOGOUT BUTTON
// =================================
logoutBtn.addEventListener("click", function() {
    let answer = confirm("Do you want to log out?");
    if (answer) {
        alert("This is a demo logout button.");
    }
});
// =================================
// 11. INITIAL DISPLAY
// =================================
displayJobs(jobs);
console.log("JobBridge Jobseeker page loaded successfully.");