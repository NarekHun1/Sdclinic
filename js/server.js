const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = '8026491620:AAE3qaSoZcsHuCwFyazbiuQ1f40vHfdlccs';
const CHAT_ID = '934669069';

// Function to validate incoming form data
function validateFormData(data) {
    const { name, phone, service } = data;

    // Check if all required fields are present
    if (!name || !phone || !service) {
        return { valid: false, message: "Все поля должны быть заполнены." };
    }

    // Validate phone number format using a regular expression
    const phonePattern = /^[\d\+\-\(\)\s]*$/;
    if (!phonePattern.test(phone)) {
        return { valid: false, message: "Неверный формат телефона." };
    }

    return { valid: true };
}

// Route to handle form submission
app.post("/send-to-telegram", async (req, res) => {
    const { name, phone, service } = req.body;

    const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/; // Regex to allow only letters and spaces
    if (!namePattern.test(name)) {
        return { valid: false, message: "Имя не должно содержать цифры." };
    }
    // Validate form data
    const validation = validateFormData({ name, phone, service });
    if (!validation.valid) {
        return res.status(400).json({ success: false, message: validation.message });
    }

    const message = `🆕 Новая запись:\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💼 Услуга: ${service}`;

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML",
        });

        res.status(200).json({ success: true, message: "Сообщение отправлено в Telegram!" });
    } catch (error) {
        console.error("Ошибка при отправке:", error);
        res.status(500).json({ success: false, message: "Ошибка при отправке сообщения" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
