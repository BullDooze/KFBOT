const { Client } = require("discord.js")
const ms = require("ms")
const mongoose = require("mongoose")
const mongodbURL = "mongodb+srv://Viplol:seeviplol@viplol.l2kroyc.mongodb.net/test"

module.exports = {
    name:"ready",
    
    /**
     * @param { Client } client
     */

    async execute (client) {

        const { user, ws } = client
        
        console.log(`${user.tag} is now Online!`)

        setInterval(() => {
            const ping = ws.ping

            user.setActivity({
                name: `Viplol Ping: ${ping} ms`,
                type: 3
            })
        }, ms("5s"))

      if (!mongodbURL) return
mongoose.connect(mongodbURL, {
useNewUrlParser: true, 
useUnifiedTopology: true
}).then(() => {
console.log("Connected to Database!")
}).catch(err => console.log(err))


    }
}