document.addEventListener("DOMContentLoaded", function () {
  //============================================
  // Counter
  // ===========================================
  let counters = document.querySelectorAll(".counter h2");

  counters.forEach((counter) => {
    let target = parseInt(counter.getAttribute("data-value"));
    let current = 0;

    let steps = 100;
    let incriment = Math.ceil(target / steps);

    let interval = setInterval(() => {
      current += incriment;

      if (current >= target) {
        counter.textContent = target + "+";
        clearInterval(interval);
      } else {
        counter.textContent = current + "+";
      }
    }, 50);
  });

  
});
