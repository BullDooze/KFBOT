const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, time } = require("discord.js")
const ms = require("ms")
const EditReply = require("../../Systems/EditReply")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "kick",
  description: "Kick a member from the server",
  UserPerms: ["KickMembers"],
  BotPerms: ["KickMembers"],
  category: "Moderation",
  options: [
    {
      name: "user",
      description: "Select the user",
      type: 6,
      required: true
    },
    {
      name: "reason",
      description: "Provide a Reason",
      type: 3,
      required: false
    },
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

    if (member.id === user.id) return EditReply(interaction, "❌", `You cant kick yourself`)
    if (guild.ownerId === member.id) return EditReply(interaction, "❌", `You cant kick the server owner`)
    if (guild.members.me.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, "❌", `You cant kick a member of your same level or higher!`)
    if (interaction.member.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, "❌", `I cant kick a member of my same level or higher!`)

    const Embed = new EmbedBuilder()
      .setColor("Red")

    const row = new ActionRowBuilder().addComponents(

      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId("kick-yes")
        .setLabel("Yes"),

      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("kick-no")
        .setLabel("No")

    )

    const Page = await interaction.editReply({

      embeds: [
        Embed.setDescription(`**⚠️ ! DO you really want to kick this member?**`)
      ],
      components: [row]
    })

    const col = await Page.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: ms("15s")
    })

    col.on("collect", i => {

      if (i.user.id !== user.id) return

      switch (i.customId) {

        case "kick-yes": {

          member.kick({ reason })

          interaction.editReply({
            embeds: [
              Embed.setDescription(`✅ | ${member} has been kicked for : **${reason}**`)
            ],
            components: []
          })


        }

          member.send({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setDescription(`You've been kicked from **${guild.name}**\nreason: *${reason}*`)
            ]
          }).catch(err => {

            if (err.code !== 50007) return console.log(err)

          })
          break;

        case "kick-no": {
          interaction.editReply({
            embeds: [
              Embed.setDescription(`✅ | Kick request cancelled`)
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
          Embed.setDescription(`❌ | You didn't provide a valid response in Time!`)
        ],
        components: []
      })
    })
  }
}