const Discord = require('discord.js');
const db = require('quick.db');
const Client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
    let küfür = db.get(`küfür.${message.guild.id}.durum`)
    const embed = new Discord.MessageEmbed()
    .setAuthor("Carnoxis", client.user.avatarURL())
    .setDescription(`
    Lütfen ne yapmak istediğinizi belirtiniz.
    !küfür engel -> Küfür engeli aktif eder.
    !küfür log -> Küfür engel logunu ayarlar.
    !küfür sıfırla -> Küfür engel verilerini sıfırlar
    `)
    .setFooter("Carnoxis", message.author.avatarURL())
    if(args[0] !== "engel" && args[0] !== "sıfırla" && args[0] !== "log") return message.channel.send(embed)
if(args[0] === "engel") {       
  const member3 = new Discord.MessageEmbed()
     .setColor(0x36393F)
.setDescription(`<a:twitchbit:793899916614828062> **HATA** <a:twitchbit:793899916614828062> - Bu sunucuda yetkili değilsin.`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
      if(küfür) {
      db.delete(`küfür.${message.guild.id}`)
      message.channel.send(`<a:twitchbit:793899916614828062> **Başarılı ile küfür engel kapandı.**`).then(l => {
      l.delete({timeout: 5000})
    })//Asperius Code
    }else{
      db.set(`küfür.${message.guild.id}.durum`, "Açık")
      message.channel.send(`<a:twitchbit:793899916614828062> **Başarılı ile küfür engel açıldı.**`).then(l => {
      l.delete({timeout: 5000})
    })
    }
  }//Asperius Code
  if(args[0] === "log") {
    let küfür = db.get(`küfür.${message.guild.id}.durum`)
  const member3 = new Discord.MessageEmbed()
     .setColor(0x36393F)
.setDescription(`<a:twitchbit:793899916614828062> **HATA** <a:twitchbit:793899916614828062> - Bu sunucuda yetkili değilsin.`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
    const member = new Discord.MessageEmbed()
     .setColor(0x36393F)
.setDescription(`<a:twitchbit:793899916614828062> **HATA** <a:twitchbit:793899916614828062> - Bir kanal etiketle.`)//Asperius Code
      if(küfür) {
        let kanal = message.mentions.channels.first()
        if(!kanal) return message.channel.send(member)
      db.set(`küfür.${message.guild.id}.kanal`,kanal.id)
      message.channel.send(`<a:twitchbit:793899916614828062> **Başarılı ile küfür log kanalı ayarlandı.** `).then(l => {
      l.delete({timeout: 5000})
    })
    }else{
     message.channel.send(`<a:twitchbit:793899916614828062> **Küfür engel açık değil.**`).then(l => {
      l.delete({timeout: 5000})
    })//Asperius Code
    } 
  }
  if(args[0] === "sıfırla") {//Asperius Code
    db.delete(`küfür.${message.guild.id}.kanal`)
    db.delete(`küfür.${message.guild.id}.durum`)
    const embed = new Discord.MessageEmbed()
    .setAuthor("Carnoxis", client.user.avatarURL())//Asperius Code
    .setDescription(`
    Tüm reklam engel verileri sıfırlandı!
    `)
    .setFooter("Carnoxis", message.author.avatarURL())
    .setTimestamp()
    message.channel.send(embed)   
  }
  }
  exports.conf = {
    enabled: true, ///Asperius Code
    guildOnly: true, ///Asperius Code
    aliases: [], ///Asperius Code
    permLevel: 0 ///Asperius Code
  };
  
  exports.help = {
    name: "küfür"//Asperius Code
  };