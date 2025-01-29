const { SlashCommandBuilder } = require('discord.js');
const Axios = require(`axios`);
const botinfo = require("D:/StanBot/src/botinfo.json");
const Noblox = require('noblox.js');
const uuid  = require('uuid');
const idempoticyKey = uuid.v4();
const firstSent = new Date().toISOString();
let banTime = "0";



module.exports = {
    data: new SlashCommandBuilder()
        .setName('revokeuserrestriction')
        .setDescription('checks if a banned is user from a roblox game')
        .addIntegerOption(option => 
            option
            .setName('target')
            .setDescription('who to search for to ban :devil:')
            .setRequired(true))
        ,
        

    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const usertoSearchFor = interaction.options.getInteger('target')
        
        
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

          let UserName = await Noblox.getUsernameFromId(usertoSearchFor);
          const BanInfo = [usertoSearchFor, ModeratorID];

     //Data to be sent to ROBLOX
     const banData = {
        gameJoinRestriction: {
            active: false,
            privateReason: `Moderator: ${ModeratorID}`
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
            console.log(response.data)
            
            
        ))
        // If user doesn't have an update time AND he's not banned
       
        const newMessage = `Signal Sent,
         \nUser ID: ${usertoSearchFor}, \nUsername: ${UserName}, \nBanned: ${gally.gameJoinRestriction.active}, \nPrivate Reason: ${gally.gameJoinRestriction.privateReason},\nReason shown to user: ${gally.gameJoinRestriction.displayReason}, \nAlt accounts not banned: ${gally.gameJoinRestriction.excludeAltAccounts}
Ban Time: ${banTime}`
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