const { SlashCommandBuilder } = require('discord.js');
const Axios = require(`axios`);
const botinfo = require("D:/StanBot/src/botinfo.json");
const Noblox = require('noblox.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banuser')
        .setDescription('bans a user from a roblox game')
        .addIntegerOption(option => 
            option
            .setName('target')
            .setDescription('who to search for to ban :devil:')
            .setRequired(true))
        .addStringOption(option =>
        option
        .setName('reason')
        .setDescription('Reason for banning')
        .setRequired(true)),

    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const usertoSearchFor = interaction.options.getInteger('target')
        const reasonForBan = interaction.options.getString('reason')
        
        const modID = interaction.member.id;

        async function callApi() {
            const response = await fetch(`${botinfo.ModeratorID}`, { headers: { "Authorization": "92ee4d88-99b4-4232-8899-a5f025e51b68" } });
            const data = await response.json();
          
            return data;
          }

          let data = await callApi();
          let Moderators = ["335172130", "1071899552", "1527016459", "191976285"];
          let RobloxID = data.robloxID;
          let ModeratorID = await Noblox.getUsernameFromId(RobloxID);
          console.log(data.robloxID);

          const BanInfo = [usertoSearchFor, reasonForBan, ModeratorID];

     

        if (interaction.member.roles.cache.has('1039289552302514257')){ 
            if (Moderators.includes(RobloxID)){
                const newMessage = `Signal Sent by ${ModeratorID}`
                await interaction.editReply({
                    content:newMessage
                });
            Axios.post(`https://apis.roblox.com/messaging-service/v1/universes/${botinfo.Roblox_Token}/topics/banPlayer`, {'message': `${BanInfo}` }, {
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