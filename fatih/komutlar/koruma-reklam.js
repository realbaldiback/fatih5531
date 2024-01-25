const Discord = require('discord.js');
const db = require('quick.db');//Asperius Code
const Client = new Discord.Client();
const ayarlar = require('../ayarlar.json');//Asperius Code

const Spectrum = new Set();
exports.run = async(client, message, args) => {
    let reklam = db.get(`reklam.${message.guild.id}.durum`)//Asperius Code
    const embed = new Discord.MessageEmbed()
    .setAuthor("Carnoxis", client.user.avatarURL())
    .setDescription(`
    Lütfen ne yapmak istediğinizi belirtiniz.
    !reklam engel -> Reklam engeli aktif eder.
    !reklam log -> Reklam engel logunu ayarlar.
    !reklam sıfırla -> Reklam engel verilerini sıfırlar
    `)
    .setFooter("Carnoxis", message.author.avatarURL())
    if(args[0] !== "engel" && args[0] !== "sıfırla" && args[0] !== "log") return message.channel.send(embed)
if(args[0] === "engel") {        
  const member3 = new Discord.MessageEmbed()
     .setColor(0x36393F)
.setDescription(`<a:twitchbit:793899916614828062> **HATA** <a:twitchbit:793899916614828062> - Bu sunucuda yetkili değilsin.`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
      if(reklam) {
      db.delete(`reklam.${message.guild.id}`)//Asperius Code
      message.channel.send(`<a:twitchbit:793899916614828062> **Başarılı ile reklam engel kapandı.**`).then(l => {
      l.delete({timeout: 5000})
    })
    }else{//Asperius Code
      db.set(`reklam.${message.guild.id}.durum`, "Açık")
      message.channel.send(`<a:twitchbit:793899916614828062> **Başarılı ile reklam engel açıldı.**`).then(l => {
      l.delete({timeout: 5000})
    })
    }
  }
  if(args[0] === "log") {//Asperius Code
    const member3 = new Discord.MessageEmbed()
    .setColor(0x36393F)
.setDescription(`<a:twitchbit:793899916614828062> **HATA** <a:twitchbit:793899916614828062> - Bu sunucuda yetkili değilsin.`)
       if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
   const member = new Discord.MessageEmbed()
    .setColor(0x36393F)
.setDescription(`<a:twitchbit:793899916614828062> **HATA** <a:twitchbit:793899916614828062> - Bir kanal etiketle.`)
     if(reklam) {
       let kanal = message.mentions.channels.first()
       if(!kanal) return message.channel.send(member)
     db.set(`reklam.${message.guild.id}.kanal`,kanal.id)
     message.channel.send(`<a:twitchbit:793899916614828062> **Başarılı ile reklam log kanalı ayarlandı.** `).then(l => {
     l.delete({timeout: 5000})
   })//Asperius Code
   }else{
    message.channel.send(`<a:twitchbit:793899916614828062> **Reklam engel açık değil.**`).then(l => {
     l.delete({timeout: 5000})
   })
   }
  }
if(args[0] === "sıfırla") {
  db.delete(`reklam.${message.guild.id}.kanal`)
  db.delete(`reklam.${message.guild.id}.durum`)
  const embed = new Discord.MessageEmbed()
  .setAuthor("Carnoxis", client.user.avatarURL())
  .setDescription(`
  Tüm reklam engel verileri sıfırlandı!
  `)
  .setFooter("Carnoxis", message.author.avatarURL())//Asperius Code
  .setTimestamp()
  message.channel.send(embed)
}  
  }
  exports.conf = {
    enabled: true, //Asperius Code
    guildOnly: true, //Asperius Code
    aliases: ["link"], //Asperius Code
    permLevel: 0 //Asperius Code
  };
  
  exports.help = {
    name: "reklam" //Asperius Code
  };//Asperius Code