document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const slides = slider.querySelectorAll(".slide");
    const totalOriginalSlides = slides.length;

    let currentIndex = 0;
    let interval;

    // Клонируем первый слайд и добавляем в конец
    const firstClone = slides[0].cloneNode(true);
    slider.appendChild(firstClone);

    const totalSlides = totalOriginalSlides + 1; // +1 из-за клона

    function updateSlide(animate = true) {
        slider.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex++;
        updateSlide();

        if (currentIndex === totalSlides - 1) {
            // Когда показываем клон, через 0.5 сек мгновенно возвращаемся к первому слайду
            setTimeout(() => {
                currentIndex = 0;
                updateSlide(false);
            }, 500); // должно совпадать с transition duration
        }
    }

    function prevSlide() {
        if (currentIndex === 0) {
            currentIndex = totalSlides - 1;
            updateSlide(false);
            setTimeout(() => {
                currentIndex--;
                updateSlide();
            }, 20);
        } else {
            currentIndex--;
            updateSlide();
        }
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    document.querySelector(".toggle-auto").addEventListener("click", () => {
        if (interval) {
            stopAutoSlide();
            interval = null;
        } else {
            startAutoSlide();
        }
    });

    startAutoSlide();
});
