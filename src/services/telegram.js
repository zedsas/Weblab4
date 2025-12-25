const BOT_TOKEN = "8529883105:AAExr-sv5fQS3qkgMzyVGotn4JX8BJdFc3Q";
const CHAT_ID = "5185300128";

export async function sendToTelegram(title, description) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const text = `Заметка:\n${title}\n\nОписание:\n${description}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
