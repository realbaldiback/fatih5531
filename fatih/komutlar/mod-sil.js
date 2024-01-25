const Discord = require('discord.js');//Asperius Code
const db = require('quick.db');//Asperius Code
const Spectrum = new Set();//Asperius Code
//Asperius Code
exports.run = async(client, message, args) => {   
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`<a:twitchbit:801155287842947133> Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  //Asperius Code
if(isNaN(args[0])) {
  var errembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField(`Yanlış Kullanım!`, `Bir rakam yazmalısın!`)//Asperius Code
    .addField(`Doğru Kullanım:`, `c?sil <temizlenecek mesaj sayısı>`)//Asperius Code
return message.channel.send(errembed);
}//Asperius Code
  //Asperius Code
if (args[0] < 1) return message.reply("**1** adetten az mesaj silemem!")
if (args[0] > 100) return message.reply("**100** adetten fazla mesaj silemem!")
  
message.channel.bulkDelete(args[0]).then(deletedMessages => {
if (deletedMessages.size < 1) return message.reply("Hiç mesaj silemedim! _(**14** günden önceki mesajları silemem!)_");
})
message.channel.send(`<a:twitchbit:801155287842947133> **${args[0]}** adet mesaj başarıyla silindi!`).then(m => m.delete({timeout: 5000}));
}//Asperius Code
exports.conf = {
  enabled: true, //Asperius Code
  guildOnly: true, //Asperius Code
  aliases: ["remove"], //Asperius Code
  permLevel: 0 //Asperius Code
};

exports.help = {
  name: "sil" //Asperius Code
};