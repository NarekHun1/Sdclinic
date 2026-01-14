document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".review-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");

    // Открыть картинку
    images.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    // Закрыть по крестику
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Закрыть по клику вне картинки
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // Закрыть по Esc
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    });
});
