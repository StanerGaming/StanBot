const { SlashCommandBuilder, time } = require('discord.js');
const Axios = require(`axios`);
const Noblox = require('noblox.js');
const botinfo = require("D:/StanBot/src/botinfo.json");

var months = 2592000;
var weeks = 604800;
var days = 86400;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempbanuser')
        .setDescription('temporarily bans a user from a roblox game')
        .addIntegerOption(option => 
            option
            .setName('target')
            .setDescription('who to search for to ban :devil:')
            .setRequired(true))
        .addStringOption(option =>
        option
        .setName('reason')
        .setDescription('Reason for banning')
        .setRequired(true))
        .addIntegerOption(option => 
            option
            .setName('months')
            .setDescription('months for ban')
            .setRequired(true))
        .addIntegerOption(option => 
            option
            .setName('weeks')
            .setDescription('weeks to ban')
            .setRequired(true))
        .addIntegerOption(option => 
             option
            .setName('days')
            .setDescription('days to ban')
            .setRequired(true)),

    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const usertoSearchFor = interaction.options.getInteger('target')
        const reasonForBan = interaction.options.getString('reason')
        const targetUsername = await Noblox.getUsernameFromId(`${usertoSearchFor}`)

        const daysToBan = interaction.options.getInteger('days') 
        const daysToBaninSeconds = daysToBan * days
        const monthsToBan = interaction.options.getInteger('months')
        const monthsToBaninSeconds = monthsToBan * months
        const weeksToBan = interaction.options.getInteger('weeks')
        const weeksToBaninSeconds = weeksToBan * weeks
        const timeToBan = daysToBaninSeconds + monthsToBaninSeconds + weeksToBaninSeconds;
        
        const modID = interaction.member.id;

        async function callApi() {
            const response = await fetch(`https://api.blox.link/v4/public/guilds/954883852973789265/discord-to-roblox/${modID}`, { headers: { "Authorization": `${botinfo.ModeratorID}` } });
            const data = await response.json();
          
            return data;
          }

          let data = await callApi();
          let Moderators = ["335172130", "1071899552", "1527016459", "191976285"];
          let RobloxID = data.robloxID;
          let ModeratorID = await Noblox.getUsernameFromId(RobloxID);
          console.log(data.robloxID);

          const BanInfo = [usertoSearchFor, reasonForBan, ModeratorID, timeToBan];

     

        if (interaction.member.roles.cache.has('1039289552302514257')){ 
            if (Moderators.includes(RobloxID)){
                const newMessage = `Signal Sent by ${ModeratorID} to temp ban ${targetUsername} (ID: ${usertoSearchFor}) for ${timeToBan} seconds`
                await interaction.editReply({
                    content:newMessage
                });
            Axios.post(`https://apis.roblox.com/messaging-service/v1/universes/${botinfo.Roblox_Token}/topics/temporalBan `, {'message': `${BanInfo}` }, {
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