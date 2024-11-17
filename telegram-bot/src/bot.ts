import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

// Type definition for environment variables
interface Environment {
  BOT_TOKEN: string;
  WEBAPP_URL: string;
}

// Validate environment variables
function validateEnv(): Environment {
  if (!process.env.BOT_TOKEN) {
    throw new Error("BOT_TOKEN is required");
  }
  if (!process.env.WEBAPP_URL) {
    throw new Error("WEBAPP_URL is required");
  }

  return {
    BOT_TOKEN: process.env.BOT_TOKEN,
    WEBAPP_URL: "https://tontine.money/",
  };
}

class TelegramMiniAppBot {
  private bot: TelegramBot;
  private webAppUrl: string;

  constructor(token: string, webAppUrl: string) {
    this.bot = new TelegramBot(token, { polling: true });
    this.webAppUrl = webAppUrl;
    this.initializeHandlers();
  }

  private initializeHandlers(): void {
    // Handle /start command
    this.bot.onText(/\/start/, this.handleStart.bind(this));

    // Handle errors
    this.bot.on("error", this.handleError.bind(this));
  }

  private handleStart(msg: TelegramBot.Message): void {
    const chatId = msg.chat.id;

    const keyboard: TelegramBot.InlineKeyboardMarkup = {
      inline_keyboard: [
        [
          {
            text: "Open MiniLend App",
            web_app: { url: this.webAppUrl },
          },
        ],
      ],
    };

    this.bot.sendMessage(chatId, "Welcome! Click the button below to open the mini app:", {
      reply_markup: keyboard,
    });
  }

  private handleError(error: Error): void {
    console.error("Telegram Bot Error:", error);
  }
}

try {
  // Get and validate environment variables
  const env = validateEnv();

  // Initialize the bot
  new TelegramMiniAppBot(env.BOT_TOKEN, env.WEBAPP_URL);

  console.log("Bot is running...");
} catch (error) {
  console.error("Failed to start bot:", error);
  process.exit(1);
}
