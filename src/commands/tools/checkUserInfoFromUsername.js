const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const Axios = require(`axios`);
const Noblox = require('noblox.js');
var ids;
var newMessage;
var playerInfo;



module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkplayerinfofromusername')
        .setDescription("Gets a player's info from their username")
        .addStringOption(option => 
            option
            .setName('target')
            .setDescription('who to search for')
            .setRequired(true)),
        async execute(interaction, client){
            const message = await interaction.deferReply({
                fetchReply: true
            });
            const usertoSearchFor = interaction.options.getString('target')
            
            
            if (interaction.member.roles.cache.has('1039289552302514257')){
            try{
                 ids = await Noblox.getIdFromUsername(usertoSearchFor)
                 playerInfo = await Noblox.getPlayerInfo({userId: ids})
                 newMessage = `Found! \nUser ID: ${ids} \nUsername: ${playerInfo.username} \nDisplay name: ${playerInfo.displayName} \nAccount age: ${playerInfo.age} \nDate Joined: ${playerInfo.joinDate} \nBanned from roblox?: ${playerInfo.isBanned}`
        await interaction.editReply({
            content:newMessage
        });
            }
            catch{
                newMessage = `Error! Username not found!`
                await interaction.editReply({
                    content:newMessage, ephemeral: true
                });
            }
            
            
            }
            else{
                const newMessage = `Access to this command is restricted`
                await interaction.editReply({
                    content:newMessage
                });
            }

         
    }
}
