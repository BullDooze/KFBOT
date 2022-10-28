const { Client, ChatInputCommandInteraction } = require("discord.js")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "ping",
  description: "Displays the ping",
  category: "Information",

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {

    interaction.reply({content: "⌛"+ `The current WebSocket Latency is : \`${client.ws.ping} ms\``,ephemeral:true})


  }
}