const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns ping or something I dunno'),
    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });

    const newMessage = `Pong! API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
    await interaction.editReply({
        content:newMessage
    });
    }


}