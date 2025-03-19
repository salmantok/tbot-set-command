import { Telegraf, Markup } from 'telegraf';
import 'dotenv/config';

const bot = new Telegraf(process.env.BOT_TOKEN); // Ganti dengan token bot kamu

// Set perintah bot
async function setCommands() {
  await bot.telegram.setMyCommands([
    { command: 'start', description: 'Mulai bot' },
    { command: 'help', description: 'Tampilkan bantuan' },
    { command: 'about', description: 'Tentang bot ini' },
  ]);
}

// Fungsi untuk mendapatkan keyboard
function getKeyboard() {
  return Markup.keyboard([['Start', 'Help'], ['About']]).resize();
}

// Pesan untuk setiap perintah
const commandMessages = {
  start:
    '👋 *Selamat datang di bot ini!* Gunakan tombol di bawah untuk navigasi.',
  help: '🆘 *Ini adalah pesan bantuan.* Silakan pilih perintah yang sesuai.',
  about: 'ℹ️ *Bot ini dibuat menggunakan Telegraf.js.* Selamat mencoba!',
};

// Handler untuk command
bot.command(['start', 'help', 'about'], (ctx) => {
  const command = ctx.message.text.slice(1); // Ambil nama perintah tanpa "/"
  const response = commandMessages[command];

  ctx.replyWithMarkdown(response, getKeyboard());
});

// Handler untuk keyboard (pesan tanpa "/")
bot.hears(['Start', 'Help', 'About'], (ctx) => {
  const text = ctx.message.text.toLowerCase(); // Ambil teks dari keyboard
  const keyboardResponse = `🔹 Kamu memilih *${text}* dari tombol keyboard.`;

  ctx.replyWithMarkdown(keyboardResponse);
});

// Jalankan bot
(async () => {
  try {
    setCommands();
    bot.launch();
    await console.log('✅ Bot berjalan...');
  } catch (err) {
    console.error('❌ Gagal menjalankan bot:', err);
  }
})();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
