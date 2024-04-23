require('dotenv').config();
const { token } = process.env;
const Axios = require('axios');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = []

const processs = require('node:process');

processs.on('unhandledRejection', async (reason, promise) => {
    console.log('Unhandled Rejection at: ', promise, 'reason; ', reason);
});

processs.on('uncaughtException', (err) =>{
    console.log('Uncaught exception: ', err);
});

processs.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('Uncaught exception: ', err, origin);
});

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter(file => file.endsWith('.js'));
   for (const file of functionFiles) 
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);