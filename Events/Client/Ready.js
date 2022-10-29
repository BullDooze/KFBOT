const { Client } = require("discord.js")
const ms = require("ms")
const mongoose = require("mongoose")
const mongodbURL = "mongodb+srv://BullDoze:pzOBVOJyhJH4w2s4@cluster0.dmhva7m.mongodb.net/?retryWrites=true&w=majority"
 //changing the mongodb
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