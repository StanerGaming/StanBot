const { SlashCommandBuilder } = require('discord.js');
const Axios = require(`axios`);
const botinfo = require("D:/StanBot/src/botinfo.json");
const Noblox = require('noblox.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('revokeban')
        .setDescription('revokes the ban from a roblox game')
        .addIntegerOption(option => 
            option
            .setName('target')
            .setDescription('who to search for to unban :angel:')
            .setRequired(true)),
      

    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const usertoSearchFor = interaction.options.getInteger('target')
        
        
        const modID = interaction.member.id;

        async function callApi() {
            const response = await fetch(`https://api.blox.link/v4/public/guilds/954883852973789265/discord-to-roblox/${modID}`, { headers: { "Authorization": `${botinfo.ModeratorID}` } });
            const data = await response.json();
          
            return data;
          }

          let data = await callApi();
          let Moderators = ["335172130", "1071899552", "1527016459", "191976285"];
          let RobloxID = data.robloxID;
          let UnbannedUserName = await Noblox.getUsernameFromId(usertoSearchFor);
          let ModeratorID = await Noblox.getUsernameFromId(RobloxID);
          console.log(data.robloxID);

          const BanInfo = [usertoSearchFor, ModeratorID];

     

        if (interaction.member.roles.cache.has('1039289552302514257')){ 
            if (Moderators.includes(RobloxID)){
                const newMessage = `Signal Sent for unban by ${ModeratorID} to unban ${UnbannedUserName} (ID: ${usertoSearchFor})`
                await interaction.editReply({
                    content:newMessage
                });
            Axios.post(`https://apis.roblox.com/messaging-service/v1/universes/${botinfo.Roblox_Token}/topics/revokeBan`, {'message': `${BanInfo}` }, {
            headers:{
            'x-api-key': 'Dg1OUDaa3EaYMPM+VCJZHVMr7B7VvRWIsMjfajvrKYpTLwOg',
            'Content-Type': 'application/json' 

            }
        }
        ).then(response => (
            console.log(response.data)
        ))
            }
            else{ 
                const newMessage = `Not a moderator, what a noob lol`
            await interaction.editReply({
                content:newMessage
            });}
            
           
            }
            else{
                const newMessage = `Access to this command is restricted`
                await interaction.editReply({
                    content:newMessage
                });
            }
    
    }


}