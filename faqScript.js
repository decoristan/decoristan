
// FAQ Toggle Script
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const answer = button.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

