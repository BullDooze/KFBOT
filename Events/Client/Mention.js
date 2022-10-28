const {
  Client,
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js")
const ms = require("ms")

module.exports = {
  name: "messageCreate",

  /*
   * @param {Message} message 
   * @param {Client} client 
   */
  async execute(message, client) {
    const {
      author,
      guild,
      content
    } = message
    const {
      user
    } = client
    if (!guild || author.bot) return
    if (content.includes("@here") || content.includes("@everyone")) return
    if (!content.includes(user.id)) return
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Red")
          .setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL()
          })
          .setDescription(`Hey, I am Killer Fleet's Bot. Run /help for my commands`)
          .setThumbnail(user.displayAvatarURL())
          .setFooter({
            text: "Killer Fleet"
          })
          .setTimestamp()

      ],

      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            .setLabel("Sus Link"),

          // new ButtonBuilder()
          // .setStyle(ButtonStyle.Link)
          // .setURL("")
          // .setLabel("Dashboard"),

        )
      ]
    }).then(msg => {
      setTimeout(() => {
        msg.delete().catch(err => {

          if (err.code !== 10008) return console.log(err)

        })
      }, ms("10s"))

    })
  }
}