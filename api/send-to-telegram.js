export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { name, phone, service } = req.body || {};

        if (!name || !phone || !service) {
            return res.status(400).json({ success: false, message: 'Все поля должны быть заполнены.' });
        }

        const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
        if (!namePattern.test(name)) {
            return res.status(400).json({ success: false, message: 'Имя не должно содержать цифры.' });
        }

        const phonePattern = /^[\d\+\-\(\)\s]*$/;
        if (!phonePattern.test(phone)) {
            return res.status(400).json({ success: false, message: 'Неверный формат телефона.' });
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            return res.status(500).json({ success: false, message: 'Server env vars missing' });
        }

        const text =
            `🆕 Новая запись:\n` +
            `👤 Имя: ${name}\n` +
            `📞 Телефон: ${phone}\n` +
            `💼 Услуга: ${service}`;

        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text })
        });

        const data = await tgRes.json();

        if (!data.ok) {
            return res.status(500).json({ success: false, message: `Telegram error: ${data.description || 'unknown'}` });
        }

        return res.status(200).json({ success: true, message: 'Сообщение отправлено в Telegram!' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: 'Ошибка при отправке сообщения' });
    }
}
