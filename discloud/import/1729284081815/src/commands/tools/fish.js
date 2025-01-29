const { SlashCommandBuilder, MessageComponentInteraction, Message } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('fish')
        .setDescription('cool fish'),
    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });
        if (message.member.roles.cache.some(r => r.name === 'Owner')){
    const newMessage = `https://media.discordapp.net/attachments/849750633967910942/873383495358087208/image0.gif`
    await interaction.editReply({
        content:newMessage
    });
    }
    else{
        const newMessage = `your mom lol`
        await interaction.editReply({
            content:newMessage
        });
    }
    }


}