const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');//Asperius Code
const db = require('quick.db')
//Asperius Code
exports.run = (client, message, args) => {
let reklamlog =  db.get(`reklam.${message.guild.id}.kanal`)  //Asperius Code
let reklam = db.get(`reklam.${message.guild.id}.durum`)//Asperius Code
let küfürlog = db.get(`küfür.${message.guild.id}.kanal`)  
let küfür = db.get(`küfür.${message.guild.id}.durum`)  //Asperius Code
const yardım = new MessageEmbed()
.setColor("ff0000")
.setAuthor("Asperius Code", client.user.avatarURL())
.setDescription(`Asperius Moderasyon Ayarları`)
.addField("Reklam Log", `<#${reklamlog ? reklamlog: "Yok"}>`, true)
.addField("Reklam", `${reklam ? reklam: "Kapalı"}`, true)
.addField("Küfür Log", `<#${küfürlog ? küfürlog: "Yok"}>`, true)
.addField("Küfür", `${küfür ? küfür: "Kapalı"}`, true)
.setFooter("Asperius Code", message.author.avatarURL())
.setTimestamp()
message.channel.send(yardım)
}
exports.conf = {
  aliases: ["config"],
  permLevel: "0"//Asperius Code
}
exports.help = {
  name: "ayarlar"//Asperius Code
}//Asperius Code