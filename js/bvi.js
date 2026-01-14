// Флаг для режима доступности
let isBviActive = false;

// При загрузке страницы убеждаемся, что модальное окно и кнопка "Обычная версия" скрыты
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("settings-modal").style.display = "none";
    document.getElementById("bvi-exit").style.display = "none";
});

// Обработчик нажатия на иконку (открытие настроек + показ tooltip)
document.getElementById("open-settings").addEventListener("click", function () {
    const settingsModal = document.getElementById("settings-modal");
    // Если модальное окно ещё не открыто, открываем его и показываем tooltip
    if (settingsModal.style.display !== "block") {
        settingsModal.style.display = "block";
        document.getElementById("bvi-exit").style.display = "block";
        isBviActive = true;
        showTooltip();
    }
});

// Функция показа кастомной подсказки на 2 секунды
function showTooltip() {
    const tooltip = document.getElementById("custom-tooltip");
    tooltip.style.display = "block";
    setTimeout(() => {
        tooltip.style.display = "none";
    }, 2000);
}

// Обработчик для закрытия модального окна (нажатие на крестик)
document.getElementById("close-settings").addEventListener("click", function () {
    document.getElementById("settings-modal").style.display = "none";
    // Здесь мы не отключаем режим BVI, чтобы озвучивание оставалось активным,
    // если это требуется – оставляем isBviActive = true;
});

// Обработчик для кнопки "Обычная версия" (выключение режима)
document.getElementById("bvi-exit").addEventListener("click", function () {
    isBviActive = false;
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    document.body.style.fontFamily = "";
    window.speechSynthesis.cancel();
    document.getElementById("bvi-exit").style.display = "none";
    // Закрываем модальное окно, если оно открыто
    document.getElementById("settings-modal").style.display = "none";
});

// Изменение фона
document.getElementById('bg-color-picker').addEventListener('input', function () {
    document.body.style.backgroundColor = this.value;
});

// Изменение текста
document.getElementById('text-color-picker').addEventListener('input', function () {
    document.body.style.color = this.value;
});

// Изменение шрифта
document.getElementById('font-select').addEventListener('change', function () {
    document.body.style.fontFamily = this.value;
});

// Сброс настроек
document.getElementById("reset-settings").addEventListener("click", function () {
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    document.body.style.fontFamily = "";
});

// Озвучивание текста при клике (работает только, если режим активен)
document.addEventListener("click", function (e) {
    if (!isBviActive) return;

    // Если пользователь кликнул на иконку – не запускаем озвучку повторно,
    // чтобы не мешать открытию окна настроек.
    if (e.target.id === "open-settings") return;

    const selection = window.getSelection().toString().trim();
    let text = selection || e.target.innerText || e.target.alt || e.target.getAttribute("title");

    if (text && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ru-RU";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }
});