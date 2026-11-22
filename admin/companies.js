const companies = [
  { name: "Greenfield Foods", email: "hr@greenfield.example", city: "Dhaka", date: "2026-10-28", posts: 0, hired: 0, status: "Pending" },
  { name: "Metro Builders", email: "jobs@metro.example", city: "Chattogram", date: "2026-10-30", posts: 0, hired: 0, status: "Pending" },
  { name: "Sunrise Clinic", email: "admin@sunrise.example", city: "Sylhet", date: "2026-11-01", posts: 0, hired: 0, status: "Pending" },
  { name: "Northwind Retail", email: "", city: "Dhaka", date: "2026-06-12", posts: 5, hired: 24, status: "Verified" },
  { name: "Brightline Studio", email: "", city: "Remote", date: "2026-07-03", posts: 2, hired: 9, status: "Verified" },
  { name: "Swift Logistics", email: "", city: "Chattogram", date: "2026-07-21", posts: 4, hired: 38, status: "Verified" }
];

const posts = [
  { job: "Warehouse Worker", company: "Swift Logistics", type: "Full-time", workers: 6, date: "2026-11-01", applicants: 0, status: "Pending" },
  { job: "Customer Support Agent", company: "Brightline Studio", type: "Part-time", workers: 4, date: "2026-11-01", applicants: 0, status: "Pending" },
  { job: "Shop Cashier", company: "Northwind Retail", type: "Contract", workers: 2, date: "2026-11-02", applicants: 0, status: "Pending" },
  { job: "Sales Assistant", company: "Northwind Retail", type: "Full-time", workers: 3, date: "2026-10-05", applicants: 18, status: "Approved" },
  { job: "Graphic Design Intern", company: "Brightline Studio", type: "Internship", workers: 2, date: "2026-10-12", applicants: 11, status: "Approved" },
  { job: "Delivery Rider", company: "Swift Logistics", type: "Part-time", workers: 10, date: "2026-10-20", applicants: 27, status: "Approved" }
];

function statusTag(status) {
  let cls;
  switch (status) {
    case "Verified":
      cls = "tag";
      break;
    case "Suspended":
      cls = "tag tag-warn";
      break;
    default:
      cls = "tag";
  }
  return '<span class="' + cls + '">' + status + '</span>';
}

function verifyCompany(i)  { companies[i].status = "Verified";  showAll(); }
function rejectCompany(i)  { companies[i].status = "Rejected";  showAll(); }
function suspendCompany(i) { companies[i].status = "Suspended"; showAll(); }
function restoreCompany(i) { companies[i].status = "Verified";  showAll(); }
function approvePost(i)    { posts[i].status = "Approved";      showAll(); }
function rejectPost(i)     { posts[i].status = "Rejected";      showAll(); }
function removePost(i)     { posts[i].status = "Removed";       showAll(); }

function showAll() {
  let waiting = "", verified = "", requests = "", approved = "";
  let nWaiting = 0, nVerified = 0, nRequests = 0, nApproved = 0;

  for (let i = 0; i < companies.length; i++) {
    let c = companies[i];

    if (c.status == "Pending") {
      nWaiting++;
      waiting += "<tr><td>" + c.name + "</td><td>" + c.email + "</td><td>" + c.city + "</td><td>" + c.date + "</td>"
        + '<td><button class="btn" onclick="verifyCompany(' + i + ')">Verify</button> '
        + '<button class="btn-outline" onclick="rejectCompany(' + i + ')">Reject</button></td></tr>';
    }

    if (c.status == "Verified" || c.status == "Suspended") {
      if (c.status == "Verified") {
        nVerified++;
      }
      let button;
      if (c.status == "Verified") {
        button = '<button class="btn-outline" onclick="suspendCompany(' + i + ')">Suspend</button>';
      } else {
        button = '<button class="btn" onclick="restoreCompany(' + i + ')">Restore</button>';
      }
      verified += "<tr><td>" + c.name + "</td><td>" + c.city + "</td><td>" + c.date + "</td><td>" + c.posts + "</td><td>" + c.hired + "</td>"
        + "<td>" + statusTag(c.status) + "</td><td>" + button + "</td></tr>";
    }
  }

  for (let i = 0; i < posts.length; i++) {
    let p = posts[i];

    if (p.status == "Pending") {
      nRequests++;
      requests += "<tr><td>" + p.job + "</td><td>" + p.company + "</td><td>" + p.type + "</td><td>" + p.workers + "</td><td>" + p.date + "</td>"
        + '<td><button class="btn" onclick="approvePost(' + i + ')">Approve</button> '
        + '<button class="btn-outline" onclick="rejectPost(' + i + ')">Reject</button></td></tr>';
    }

    if (p.status == "Approved") {
      nApproved++;
      approved += "<tr><td>" + p.job + "</td><td>" + p.company + "</td><td>" + p.type + "</td><td>" + p.workers + "</td><td>" + p.date + "</td><td>" + p.applicants + "</td>"
        + '<td><button class="btn-outline" onclick="removePost(' + i + ')">Remove</button></td></tr>';
    }
  }

  if (waiting == "")  { waiting  = '<tr><td colspan="5">Nothing waiting.</td></tr>'; }
  if (verified == "") { verified = '<tr><td colspan="7">No verified companies.</td></tr>'; }
  if (requests == "") { requests = '<tr><td colspan="6">Nothing waiting.</td></tr>'; }
  if (approved == "") { approved = '<tr><td colspan="7">No approved posts.</td></tr>'; }

  document.getElementById("waiting-rows").innerHTML = waiting;
  document.getElementById("verified-rows").innerHTML = verified;
  document.getElementById("request-rows").innerHTML = requests;
  document.getElementById("approved-rows").innerHTML = approved;

  document.getElementById("n-waiting").innerHTML = nWaiting;
  document.getElementById("n-verified").innerHTML = nVerified;
  document.getElementById("n-requests").innerHTML = nRequests;
  document.getElementById("n-approved").innerHTML = nApproved;
}