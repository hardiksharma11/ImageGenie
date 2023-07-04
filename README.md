# ImageGenie - WhatsApp AI Image Generation Bot


This is a WhatsApp bot that generates AI images based on text prompts. It uses the WhatsApp Web API and the Hugging Face AI model for image generation.

## Prerequisites
- Node.js (version 12 or higher)
- npm package manager
- WhatsApp account

## Installation
1. Clone the repository:
   `git clone https://github.com/your-username/whatsapp-ai-image-bot.git`

2. Install the dependencies:
   `npm install`

3. Configuration:
   - Replace `API_TOKEN` in the .env file with your actual API key.

4. Start the bot:
   `nodemon index.js`

5. Scan the QR code:
   - Open WhatsApp on your phone.
   - Go to Settings > WhatsApp Web/Desktop.
   - Scan the QR code displayed in the terminal.

6. Start generating AI images:
   - Send a message to the bot with a text prompt prefixed by an exclamation mark (!). For example, !cowboy will generate an AI image related to cowboys.

- The bot will process the prompt, generate an image using the Hugging Face AI model, and reply with the generated image.

