const { SlashCommandBuilder } = require('discord.js');
const Axios = require(`axios`);
const botinfo = require("/home/node/src/botinfo.json");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkifuseringame')
        .setDescription('Does something')
        .addStringOption(option => 
            option
            .setName('target')
            .setDescription('who to search for :devil:')
            .setRequired(true)),

    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const usertoSearchFor = interaction.options.getString('target')

        if (interaction.member.roles.cache.has('1039289552302514257')){ 
            const newMessage = `Signal Sent`
                await interaction.editReply({
                    content:newMessage
                });
            Axios.post(`https://apis.roblox.com/messaging-service/v1/universes/${botinfo.Roblox_Token}/topics/CheckIfPlayerInGame`, {'message': `${usertoSearchFor}` }, {
            headers:{
                'x-api-key': `${botinfo.Roblox_Key}`,
            'Content-Type': 'application/json' 

            }
        }

        
        ).then(response => (
            console.log(response.data)
        ))

         Axios.post(`https://apis.roblox.com/messaging-service/v1/universes/${botinfo.Roblox_Token2}/topics/GetDataFromOriginalGame`, {'message': `${usertoSearchFor}` }, {
            headers:{
                'x-api-key': `${botinfo.Roblox_Key}`,
            'Content-Type': 'application/json' 

            }
        }

        
        ).then(response => (
            console.log(response.data)
        ))
        
           
            }
            else{
                const newMessage = `Access to this command is restricted`
                await interaction.editReply({
                    content:newMessage
                });
            }
    
    }


}