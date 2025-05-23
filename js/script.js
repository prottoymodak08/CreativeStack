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

  //============================================
  // TypeWriter Effect
  // ===========================================
  const typeWriterWords = [
    "Fontend Developer",
    "SEO Enthusiast",
    "Web Designer",
    "UI/UX Designer",
  ];

  let typewriterSpan = document.querySelector(".typewriter_effect");

  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function typewriterEffect() {
    let currentWord = typeWriterWords[currentWordIndex];
    let displayWord;

    if (!isDeleting) {
      currentCharIndex++;
      displayWord = currentWord.substring(0, currentCharIndex);
    } else {
      currentCharIndex--;
      displayWord = currentWord.substring(0, currentCharIndex);
    }

    typewriterSpan.textContent = displayWord;

    let typeWriterEffectDelay = 100;

    if (isDeleting) {
      typeWriterEffectDelay = 50;
    }

    if (!isDeleting && currentCharIndex == currentWord.length) {
      typeWriterEffectDelay = 1000;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex == 0) {
      typeWriterEffectDelay = 200;
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % typeWriterWords.length;
    }

    setTimeout(typewriterEffect, typeWriterEffectDelay);
  }

  typewriterEffect();
});
