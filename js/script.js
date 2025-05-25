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
    "Amature Designer",
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

  //============================================
  // Testimonial slider
  // ===========================================
  const content = document.querySelector(".testimonial_content");
  const dots = document.querySelector(".dots");
  let data = [];
  let currentTestimonial = 0;

  fetch("data/testimonial.json")
    .then((res) => res.json())
    .then((json) => {
      data = json;
      buildDots();
      showTestimonial(0);
    })
    .catch(console.error);

  function buildDots() {
    dots.innerHTML = "";
    data.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.className = "slide_dot";
      if (i === 0) btn.classList.add("active_dot");
      btn.addEventListener("click", () => {
        if (i !== currentTestimonial) showTestimonial(i);
      });
      dots.appendChild(btn);
    });
  }

  function showTestimonial(index) {
    const direction = index > currentTestimonial ? "right" : "left";
    currentTestimonial = index;

    dots.querySelectorAll("button").forEach((b, i) => {
      b.classList.toggle("active_dot", i === index);
    });

    const { title, description } = data[index];
    content.classList.remove("slide-in-left", "slide-in-right");
    void content.offsetWidth;

    content.innerHTML = `
      <h3 class="client">${title}</h3>
      <p class="testify">${description}</p>
    `;

    content.classList.add(
      direction === "right" ? "slide-in-right" : "slide-in-left"
    );
  }

  //============================================
  // Portfolio Gallery
  // ===========================================
  const galleryList = document.querySelector(".gallery_images");
  const loadMoreBtn = document.querySelector(".load_more");
  const filterButtons = document.querySelectorAll(".filter_btn");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox_preview");
  const lightboxTitle = document.querySelector(".lightbox_title");
  const lightboxCategory = document.querySelector(".lightbox_category");
  const lightboxLink = document.querySelector(".lightbox_link");
  const lightboxCloseBtn = document.querySelector(".lightbox_close .cross");

  let galleryData = [];
  let filteredData = [];
  let currentIndex = 0;
  const batchSize = 12;

  fetch("data/portfolio.json")
    .then((res) => res.json())
    .then((json) => {
      galleryData = json.reverse();
      filteredData = galleryData;
      updateLoadMore();
      renderBatch();
    })
    .catch((err) => console.error("Failed to load portfolio.json:", err));

  function renderBatch() {
    const slice = filteredData.slice(currentIndex, currentIndex + batchSize);
    slice.forEach((item) => {
      const li = document.createElement("li");
      li.className = "img_card";
      li.innerHTML = `<img src="${item.img}" alt="${item.title}">`;
      li.addEventListener("click", () => openLightbox(item));
      galleryList.appendChild(li);
    });
    currentIndex += slice.length;
    updateLoadMore();
  }

  function updateLoadMore() {
    loadMoreBtn.style.display =
      currentIndex < filteredData.length ? "block" : "none";
  }
  loadMoreBtn.addEventListener("click", renderBatch);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelector(".filter_btn.active_filter_btn")
        ?.classList.remove("active_filter_btn");
      btn.classList.add("active_filter_btn");

      const type = btn.textContent.trim();
      filteredData =
        type === "All"
          ? galleryData
          : galleryData.filter((item) => item.type === type);

      currentIndex = 0;
      galleryList.innerHTML = "";
      updateLoadMore();
      renderBatch();
    });
  });

  function openLightbox(item) {
    lightboxImg.src = item.img;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.type;
    lightboxLink.href = item.link || "#";
    lightbox.classList.add("lightbox_show");
    document.body.style.overflow = "hidden";

    const lightboxImgLink = document.querySelector(".lightbox_img_link");
    lightboxImgLink.href = item.img;
  }
  function closeLightbox() {
    lightbox.classList.remove("lightbox_show");
    document.body.style.overflow = "";
  }
  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
});
