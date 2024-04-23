const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('dogsarebad')
        .setDescription('not cool'),
    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });

    const newMessage = `${interaction.author}`
    await interaction.editReply({
        content:newMessage
    });
    }


}