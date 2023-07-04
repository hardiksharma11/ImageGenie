require('dotenv').config();
const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');

const app = express();
const port = 5000;

const API_TOKEN = process.env.API_KEY;

// Initialize a WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox'],
  }
});


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });   
});


client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('auth_failure', msg => {
  console.error('Authentication failure:', msg);
});

client.on('disconnected', reason => {
  console.log('Client was disconnected:');
});

// Connect the client to WhatsApp
client.initialize();

const imageGenerator = async (prompt) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: `${prompt}` }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Handle incoming messages on WhatsApp
client.on('message', async (message) => {
  console.log(message.body)
  let mssg = message.body.trim()
  if (mssg[0] === '!') {
    try {
      const prompt = mssg.slice(1);
      const imageBuffer = await imageGenerator(prompt);

      // Convert the image buffer to a base64-encoded string
      const imageBase64 = imageBuffer.toString('base64');

      const media = new MessageMedia('image/*', imageBase64);

      // Send the image to the same chat where the command was received
      await message.reply(media);

      console.log('Image sent to', message.from);
    } catch (error) {
      console.error('Failed to generate and send image:', error);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
