document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("burger-menu");
    const mobileNav = document.getElementById("mobile-nav");

    burger.addEventListener("click", function () {
        this.classList.toggle("active");
        mobileNav.classList.toggle("active");
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll(".mobile-nav a").forEach(link => {
        link.addEventListener("click", function () {
            burger.classList.remove("active");
            mobileNav.classList.remove("active");
        });
    });
});