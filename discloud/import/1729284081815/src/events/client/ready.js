module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
         console.log(`So cool ${client.user.tag} actually works` );
    }
}