const { Client, EmbedBuilder } = require("discord.js")
const ChannelID = "1035157261682745405"

/**
*    @param {Client} client
*/

module.exports = async (client) => {

  const Embed = new EmbedBuilder()
    .setColor("Red")
    .setTimestamp()
    .setFooter({ text: "Error Handler by Fog" })
    .setTitle("⚠️ | Error Encountered")
  process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p)
    const Channel = client.channels.cache.get(ChannelID)
    if (!Channel) return

    Channel.send({
      embeds: [
        Embed
          .setDescription("**Unhandled Rejection/Catch:\n\n** ```" + reason + "```")
      ]
    })

  })

  process.on("uncaughtException", (err, origin) => {
    console.log(err, origin)
    const Channel = client.channels.cache.get(ChannelID)
    if (!Channel) return

    Channel.send({
      embeds: [
        Embed
          .setDescription("**Uncaught Exception/catch :\n\n** ```" + err + "\n\n" + origin.toString() + "```")
      ]
    })

  })

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(err, origin)
    const Channel = client.channels.cache.get(ChannelID)
    if (!Channel) return

    Channel.send({
      embeds: [
        Embed
          .setDescription("**Uncaught Exception/catch (Monitor):\n\n** ```" + err + "\n\n" + origin.toString() + "```")
      ]
    })

  })


}