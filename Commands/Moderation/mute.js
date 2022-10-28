const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, time } = require("discord.js")
const ms = require("ms")
const EditReply = require("../../Systems/EditReply")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "mute",
  description: "Timeout a member from the server",
  UserPerms: ["ModerateMembers"],
  BotPerms: ["ModerateMembers"],
  category: "Moderation",
  options: [
    {
      name: "user",
      description: "This is the user that will be muted",
      type: 6,
      required: true
    },
    {
      name: "time",
      description: "The time the target will stay muted",
      type: 4,
      required: true
    },
    {
      name: "reason",
      description: "A reason for the timeout",
      type: 3,
      required: false
    }
  ],

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {

    await interaction.deferReply({ ephemeral: true })

    const { options, user, guild } = interaction

    const member = options.getMember('user')
    const reason = options.getString('reason') || "no reason provided"
    const time = options.getInteger("time", true)

    if (member.id === user.id) return EditReply(interaction, "❌", `You can't mute yourself`)
    if (guild.ownerId === member.id) return EditReply(interaction, "❌", `You can't mute the server owner`)
    if (guild.members.me.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, "❌", `You can't mute a member of your same level or higher!`)
    if (interaction.member.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, "❌", `I can't mute a member of my same level or higher!`)

    const Embed = new EmbedBuilder()
      .setColor("Red")

    const row = new ActionRowBuilder().addComponents(

      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId("mute-yes")
        .setLabel("Yes"),

      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("mute-no")
        .setLabel("No")

    )

    const Page = await interaction.editReply({

      embeds: [
        Embed.setDescription(`**⚠️ ! Do you really want to mute this member?**`)
      ],
      components: [row]
    })

    const col = await Page.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: ms("15s") //if you want to, but i'm working on timeout & untimeout rn
    })

    col.on("collect", i => {

      if (i.user.id !== user.id) return

      switch (i.customId) {

        case "mute-yes": {
          member.timeout(time * 60 * 1000, `Muted by ${member.name}.\nReason:${reason}`).then(() => console.log("Timed out member")).catch(console.error)

          interaction.editReply({
            embeds: [
              Embed.setDescription(`✅ | ${member} has been muted for : **${reason}**`)
            ],
            components: []
          })


        }

          member.send({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setDescription(`You've been muted from **${guild.name}**\nreason: *${reason}*`)
            ]
          }).catch(err => {

            if (err.code !== 50007) return console.log(err)

          })
          break;

        case "mute-no": {
          interaction.editReply({
            embeds: [
              Embed.setDescription(`✅ | Timeout request cancelled`)
            ],
            components: []
          })
        }
          break
      }

    })

    col.on("end", (collected) => {

      if (collected.size > 0) return

      interaction.editReply({
        embeds: [
          Embed.setDescription(`❌ | You didn't provide a valid response in time!`)
        ],
        components: []
      })
    })
  }
}