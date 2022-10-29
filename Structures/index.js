  const { Client, Partials, Collection } = require("discord.js");
const ms = require("ms");
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table");
const { AssertionError } = require("assert");
require("dotenv").config()
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials;
// const keepAlive = require(`../server`)
//Hi hi /i cant see any files except this sus works now?
const client = new Client({
    intents: 131071,
    partials: [Channel, GuildMember, Message, ThreadMember, User, GuildScheduledEvent],
    allowedMentions: {parse: ["everyone", "roles", "users"]},
    rest: {timeout: ms("1m")}
})

client.events = new Collection()
client.commands = new Collection()

const Handlers = ["Events", "Commands", "Errors"]

Handlers.forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
})

module.exports = client

client.login('MTAzNTE1Mjg5MTEyOTg4ODg5OQ.GQ54Yj.NPVZSZufzgSQT8bekYLY2ByqLx2FlVA0p6d070')
// keepAlive()
process.on("unhandledRejection", (reason, p) => {
  console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log(" [Error_Handling] :: Multiple Resolves");
  console.log(type, promise, reason);
});