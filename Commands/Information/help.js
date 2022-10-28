/*const { Client, ChatInputCommandInteraction } = require("discord.js")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "help",
  description: "All commands of the bot",
  category: "Information",
  options:[{
  name: "Command Name",
  description: "Enter the command name for its help",
  type:"3",
  required:false,
  choices:[
    {
        name:"ping",
        value:"ping"
    },
    {
        name:"embed",
        value: "embed"
    }
  ]
  },],
  
    @param {Client} client
    @param {ChatInputCommandInteraction} interaction
   
  
  async execute(interaction, client) {
    
    interaction.reply({content:`All the commands are:\n1.ping\n 2.embed\n3.server1\n4.server\n5.trade\n6.userinfo`,ephemeral:true})


  }
}*/