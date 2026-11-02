
const registration = JSON.parse(
  sessionStorage.getItem("southstarRegistration") || "null"
);

if (!registration) {
  window.location.replace("/index.html");
} else {
  document.getElementById("userName").textContent =
    registration.fullName.split(" ")[0];

  document.getElementById("accountName").textContent =
    registration.fullName;

  document.getElementById("accountEmail").textContent =
    registration.email;
}

// Sign out
document.getElementById("logoutButton").onclick = function () {
  sessionStorage.removeItem("southstarRegistration");

  window.location.assign("/index.html");
};

// Continue button
document.getElementById("continueButton").onclick = function (event) {
  event.preventDefault();
  alert("Welcome to Southstar!");
};
