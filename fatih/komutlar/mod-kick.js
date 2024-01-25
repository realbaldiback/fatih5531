const Discord = require('discord.js');//Asperius Code
const db = require('quick.db');//Asperius Code
const moment = require('moment');//Asperius Code

exports.run = async(client, message, args, perms) => {
  if (!message.member.hasPermission("KİCK_MEMBERS")) {
    const embed = new Discord.MessageEmbed()//Asperius Code
      .setDescription(":redke: ``Bu komutu kullanabilmek için Üyeleri Yasakla yetkisine sahip olmalısın!``")
      .setColor("BLACK");
 
    message.channel.send(embed);
    return;
  }//Asperius Code
    //Asperius Code
      let u = message.mentions.users.first();
      if (!u) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription("Lütfen atılacak kişiyi etiketleyiniz!")
            .setColor("BLACK")
            .setFooter(client.user.username, client.user.avatarURL)
        );
      }//Asperius Code
    //Asperius Code
      const embed = new Discord.MessageEmbed()//Asperius Code
        .setColor("BLACK")//Asperius Code
        .setDescription(`<:unlem:808343097519112204> ${u} **Adlı şahsın sunucudan atılmasını onaylıyor musunuz?**`)
        .setFooter(client.user.username, client.user.avatarURL);//Asperius Code
      message.channel.send(embed).then(async function(sentEmbed) {
        const emojiArray = ["✅"];
        const filter = (reaction, user) =>
          emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
        await sentEmbed.react(emojiArray[0]).catch(function() {});
        var reactions = sentEmbed.createReactionCollector(filter, {
          time: 30000
        });
        reactions.on("end", () => sentEmbed.edit(`<a:unlem:750808981311717557> **İşlem iptal oldu!**`));
        reactions.on("collect", async function(reaction) {
          if (reaction.emoji.name === "✅") {
            message.channel.send(
              `<a:olur:806189416384167946> **İşlem onaylandı!** ${u} **adlı şahıs sunucudan atıldı!**`
            );
    
            message.guild.member(u).kick();
          }//Asperius Code
        });
      });
}                            //Asperius Code
exports.conf = {
  enable: true, //Asperius Code
  guildOnly: false, //Asperius Code
  aliases: ['at'], //Asperius Code
  permLevel: 0 //Asperius Code
} //Asperius Code//Asperius Code
exports.help = {
  name: "kick", //Asperius Code
  description: "Asperius Code V12 Kick komutu", //Asperius Code
  usage: "kick" //Asperius Code
}//Asperius Code