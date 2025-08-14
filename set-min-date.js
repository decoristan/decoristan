window.addEventListener("DOMContentLoaded", function () {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const today = `${year}-${month}-${day}`;
  const dateInput = document.getElementById("dateInput");

  if (dateInput) {
    dateInput.min = today;
    dateInput.value = today; // optional: preselect today's date
  }
});
