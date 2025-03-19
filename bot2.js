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
  return Markup.keyboard([['/start', '/help'], ['/about']]).resize();
}

// Satu handler untuk beberapa perintah
bot.command(['start', 'help', 'about'], (ctx) => {
  const messages = {
    start:
      '👋 *Selamat datang di bot ini!* Gunakan tombol di bawah untuk navigasi.',
    help: '🆘 *Ini adalah pesan bantuan.* Silakan pilih perintah yang sesuai.',
    about: 'ℹ️ *Bot ini dibuat menggunakan Telegraf.js.* Selamat mencoba!',
  };

  const command = ctx.message.text.slice(1); // Mengambil nama perintah tanpa "/"
  const response = messages[command];

  ctx.replyWithMarkdown(response, getKeyboard());
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
