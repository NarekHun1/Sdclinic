document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".appointment-form");
    if (!form) return;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate form fields
        const isValid = validateForm(data);
        if (!isValid) {
            alert("❌ Пожалуйста, заполните все поля правильно.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/send-to-telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                alert("✅ Спасибо! Ваша заявка успешно отправлена.");
                form.reset();
            } else {
                alert("❌ Ошибка при отправке заявки.");
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("⚠ Ошибка соединения с сервером.");
        }
    });
});

function validateForm(data) {
    const { name, phone, service } = data;

    // Check if all required fields are filled
    if (!name || !phone || !service) {
        return false;
    }
    // Validate that name doesn't contain numbers
    const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/; // Only letters and spaces allowed
    if (!namePattern.test(name)) {
        alert("❌ Имя не должно содержать цифры.");
        return false;
    }
    // Validate phone number format (using a simple regex for phone validation)
    const phonePattern = /^[\d\+\-\(\)\s]*$/;
    if (!phonePattern.test(phone)) {
        return false;
    }

    return true;
}
