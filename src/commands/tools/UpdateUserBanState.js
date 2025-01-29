const { SlashCommandBuilder } = require('discord.js');
const Axios = require(`axios`);
const botinfo = require("/home/node/src/botinfo.json");
const interCreate = require("/home/node/src/events/client/interactionCreate.js")
const Noblox = require('noblox.js');
const uuid  = require('uuid');
const idempoticyKey = uuid.v4();
const firstSent = new Date().toISOString();
let banTimer2;
let banTime = "0";
var playerInfo;
var banMessage;
var statusCode;
var statusMsg;
var UserName;

function secondsToDhms(seconds) {
    seconds = Number(seconds)
    var d = Math.floor(seconds / (3600 * 24))
    var h = Math.floor((seconds % (3600 * 24)) / 3600)
    var m = Math.floor((seconds % 3600) / 60)
    var s = Math.floor(seconds % 60)
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : ""
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : ""
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : ""
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""
    return dDisplay + hDisplay + mDisplay + sDisplay
  }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('updateuserbanstate')
        .setDescription('checks if a user is banned from a roblox game')
        .addIntegerOption(option => 
            option
            .setName('target')
            .setDescription('who to search for to ban :devil:')
            .setRequired(true))
            .addStringOption(option => 
                option
                .setName('public_reason')
                .setDescription('reason for user to view')
                .setRequired(true))
         .addBooleanOption(option =>
                 option
                .setName('excludealts')
                .setDescription('do you want to exclude alts from the ban (the alt system is experimental, currently)')
                .setRequired(true))
            .addIntegerOption(option => 
                    option
                .setName('weeks')
                .setDescription('for how much weeks the user should be banned')
                .setRequired(true))
            .addIntegerOption(option => 
                    option
                .setName('days')
                .setDescription('for how much days the user should be banned')
                .setRequired(false))
            .addIntegerOption(option => 
                        option
                    .setName('hours')
                .setDescription('for how much hours the user should be banned ')
                .setRequired(false))
            .addIntegerOption(option => 
                        option
                    .setName('minutes')
                .setDescription('for how much minutes the user should be banned')
                .setRequired(false))
            .addIntegerOption(option => 
                        option
                    .setName('seconds')
                .setDescription('for how much seconds the user should be banned')
                .setRequired(false))
        ,
        

    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });

        //Duration calculation
        let duration = (interaction.options.getInteger('weeks') * 604800) + (interaction.options.getInteger('days') * 86400) + (interaction.options.getInteger('hours') * 3600) + (interaction.options.getInteger('minutes') * 60) + interaction.options.getInteger('seconds');


        const usertoSearchFor = interaction.options.getInteger('target');
        const reasonForBan = interaction.options.getString('reason');
        try{
        playerInfo = await Noblox.getPlayerInfo({userId: usertoSearchFor});
    } catch (error)
    {
        banMessage = `aw hell nah bruh user doesn't exist you tweakin?`;
    }

        const banTimer1 = duration;
        if (banTimer1 < 0){
             banTimer2 =`edwards`;
        }
        else{
             banTimer2 = banTimer1;
        }
        const modID = interaction.member.id;
        //Don't need to get mod username 
        async function callApi() {
            const response = await fetch(`https://api.blox.link/v4/public/guilds/954883852973789265/discord-to-roblox/${modID}`, { headers: { "Authorization": `${botinfo.ModeratorID}` } });
            const data = await response.json();
          
            return data;
          }

          let data = await callApi();
          let Moderators = botinfo.Moderators;
          let RobloxID = data.robloxID;
          let ModeratorID = await Noblox.getUsernameFromId(RobloxID);
          console.log(data.robloxID);
          
          

          

          try {
             UserName = await Noblox.getUsernameFromId(usertoSearchFor);
          } catch (err)
           {
           banMessage = `hell nah bruh noblox tweakin`
    }
          const BanInfo = [usertoSearchFor, reasonForBan, ModeratorID];

     //Data to be sent to ROBLOX
     const banData = {
        gameJoinRestriction: {
            active: true,
            duration: `${banTimer2}s`,
            privateReason: ``,
            displayReason: `${interaction.options.getString('public_reason')}, Banned by moderator: @${ModeratorID}`,
            excludeAltAccounts: interaction.options.getBoolean('excludealts')
        }
     };
     


        if (interaction.member.roles.cache.has('1039289552302514257')){ 
            if (Moderators.includes(RobloxID)){
               
           
                const response =await Axios.patch(`https://apis.roblox.com/cloud/v2/universes/${botinfo.Roblox_Token}/user-restrictions/${usertoSearchFor}?idempotencyKey.key=${uuid.v4()}&idempotencyKey.firstSent=${firstSent}`, banData, {
            headers:{
            'x-api-key': botinfo.Roblox_Key
            }
             }
    ).then(response => (
        // is Response generated by axios request.
             gally = response.data,
             console.log(gally),
             statusCode = response.status
               
            
        ))
        .catch(function (error)
    {
        if (error.response)
        {
            statusMsg = error.response.data.message,
               statusCode = error.response.status;
        }
        else if (error.request) {
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    })
        // If user doesn't have an update time AND he's not banned
if (statusCode == 200){
   banMessage = `Signal Sent,
    \nUser ID: ${usertoSearchFor}, \nUsername: ${UserName}, \nBanned: ${gally.gameJoinRestriction.active},\nReason shown to user: ${gally.gameJoinRestriction.displayReason}, ${gally.gameJoinRestriction.privateReason} \nAlt accounts not banned: ${gally.gameJoinRestriction.excludeAltAccounts}
Ban Time: ${banTimer2}`
}
else{
   banMessage = `you failure (error message)\nStatus message: ${statusMsg}\nStatus code: ${statusCode}`
}
            const newMessage = `${banMessage}`
            await interaction.editReply({
                content:newMessage
            });
       
            }
            else if (playerInfo.isBanned) 
            {
                const newMessage = `Cannot ban user as User is already banned from the ROBLOX database`
                await interaction.editReply({
                    content:newMessage
                });
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