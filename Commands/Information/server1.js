const { Client, ChatInputCommandInteraction} = require("discord.js")
const request = require("request");
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "server1",
  description: "No. of players in server 1",
  category: "Information",
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {
   var number;
    async function getDataFromAPI(path) {
        return new Promise(function(resolve, reject) {
    
            request.get({
                url: `https://krew.io/api/${path}`,
                time: true
            }, function(err, res) {
    
                if (err != null) {
                    return reject(err);
                }
    
                resolve({
                    data: JSON.parse(res.body),
                    elapsedTime: res.elapsedTime
                })
            });
        })
    }
    
    getDataFromAPI("servers").then(data => {
        console.log(data.data);
        number=data.data[0].playerCount;
        interaction.reply("The Number of Players online on server 1 are: "+number)
      })

  }
}