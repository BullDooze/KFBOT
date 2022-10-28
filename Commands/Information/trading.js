const {
  Client,
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
  EmbedBuilder
} = require("discord.js")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "trade",
  description: "Trading information, on entering two islands",
  category: "Information",

  options: [{
    name: "location",
    description: "This is where you are.",
    type: 3,
    required: true,
    choices: [
      {
        name: "Labrador",
        value: "labrador",
      },
      {
        name: "Brazil",
        value: "brazil",
      },
      {
        name: "Guinea",
        value: "guinea",
      },
      {
        name: "Jamaica",
        value: "jamaica",
      },
      {
        name: "Spain",
        value: "spain",
      },
    ]

  }, {
    name: "destination",
    description: "This is where you're heading",
    type: 3,
    required: true,
    choices: [
      {
        name: "Labrador",
        value: "labrador"
      },
      {
        name: "Brazil",
        value: "brazil"
      },
      {
        name: "Guinea",
        value: "guinea"
      },
      {
        name: "Jamaica",
        value: "jamaica"
      },
      {
        name: "Spain",
        value: "spain"
      },
    ]
  }, {
    name: "cargo", //goodmorning
    description: "Your ship cargo (defaults to 10000)",
    type: 4,
    required: false
  },],

  async execute(interaction, client) {
    const {
      options
    } = interaction
    const islands = [{ // Labrador
      Rum: 105,
      Coffee: 35,
      Spice: 95,
      Silk: 85,
      Gems: 410,
      Sugar: 175,
      Bananas: 45
    },
    { //brazil
      Rum: 145,
      Coffee: 100,
      Spice: 135,
      Silk: 160,
      Gems: 300,
      Sugar: 105,
      Bananas: 20
    },
    { //guinea
      Rum: 185,
      Coffee: 50,
      Spice: 75,
      Silk: 135,
      Gems: 155,
      Sugar: 260,
      Bananas: 85
    },
    { //jamaica
      Rum: 135,
      Coffee: 45,
      Spice: 105,
      Silk: 175,
      Gems: 300,
      Sugar: 170,
      Bananas: 85
    },
    { //spain
      Rum: 125,
      Coffee: 45,
      Spice: 170,
      Silk: 110,
      Gems: 270,
      Sugar: 200,
      Bananas: 60
    }
    ]
    const cargo = {
      Rum: 5,
      Coffee: 5,
      Spice: 8,
      Silk: 15,
      Gems: 20,
      Sugar: 12,
      Bananas: 5
    }
    const indexIdentifier = ["labrador", "brazil", "guinea", "jamaica", "spain"]
    const island1 = options.getString('location').toLowerCase()
    const island2 = options.getString('destination').toLowerCase()
    var currCargo = options.getInteger("cargo")
    if (currCargo==null) {
      currCargo = 10000
    }
    const island1Dict = islands[indexIdentifier.indexOf(island1)]
    const island2Dict = islands[indexIdentifier.indexOf(island2)]
    if (island1Dict == null || island2Dict == null || island1 == island2) {
      return interaction.reply("Invalid input.")
    }
    const profits = [
      (island2Dict.Rum - island1Dict.Rum) * Math.floor(currCargo/cargo.Rum),
      (island2Dict.Coffee - island1Dict.Coffee) * Math.floor(currCargo/cargo.Coffee),
      (island2Dict.Spice - island1Dict.Spice) * Math.floor(currCargo/cargo.Spice),
      (island2Dict.Silk - island1Dict.Silk) * Math.floor(currCargo/cargo.Silk),
      (island2Dict.Gems - island1Dict.Gems) * Math.floor(currCargo/cargo.Gems),
      (island2Dict.Sugar - island1Dict.Sugar) * Math.floor(currCargo/cargo.Sugar),
      (island2Dict.Bananas - island1Dict.Bananas) * Math.floor(currCargo/cargo.Bananas)
    ];
    const sequence = ["Rum", "Coffee", "Spice", "Silk", "Gems", "Sugar", "Bananas"]
    var highestProfit = 0
    var newProfit = 0
    for (var i = 0; i < profits.length; i++) {
      if (profits[i] > highestProfit) {
        highestProfit = profits[i]
      }
    }
    const mostProfitable = sequence[profits.indexOf(highestProfit)]
    if (highestProfit == 0 || highestProfit < 0) {
      return await interaction.reply("You do not have enough cargo to buy any profitable goods.")
    }
    await interaction.reply({content:"You should buy __" + mostProfitable.toLowerCase() + "__ from " + island1 + " to " + island2 + " if you have " + currCargo + " cargo (Profit:" + highestProfit + ").",ephemeral:true})
  }
}