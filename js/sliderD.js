function initSlider(wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return;

    const slider = wrapper.querySelector(".slider");
    const slides = wrapper.querySelectorAll(".slide");
    const prevBtn = wrapper.querySelector(".prev");
    const nextBtn = wrapper.querySelector(".next");
    const totalSlides = slides.length;
    let currentIndex = 0;
    let interval;

    function updateSlide() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide();
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });

    wrapper.addEventListener("mouseenter", stopAutoSlide);
    wrapper.addEventListener("mouseleave", startAutoSlide);

    startAutoSlide();
}

// Запуск слайдера
initSlider(".my-slider");
