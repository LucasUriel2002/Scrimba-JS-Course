document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".project");

  buttons.forEach((button, index) => {
    setTimeout(() => {
      button.classList.add("animate");
    }, index * 100);
  });
});
