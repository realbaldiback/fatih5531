const Discord = require("discord.js");//Asperius Code
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.MessageEmbed()//Asperius Code
      .setDescription(":redke: ``Bu komutu kullanabilmek için Üyeleri Yasakla yetkisine sahip olmalısın!``")
      .setColor("BLACK");
 
    message.channel.send(embed);
    return;
  }//Asperius Code
 
  let u = message.mentions.users.first();
  if (!u) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(":negative_squared_cross_mark:  Lütfen banlanacak kişiyi etiketleyiniz!")
        .setColor("BLACK")
        .setFooter(bot.user.username, bot.user.avatarURL)
    );
  }//Asperius Code
 
  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(`✅ : ${u} Adlı şahsın sunucudan banlanmasını onaylıyor musunuz?`)//Asperius Code
    .setFooter(bot.user.username, bot.user.avatarURL);
  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = [":white_check_mark:"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;//Asperius Code
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("end", () => sentEmbed.edit(":negative_squared_cross_mark:  İşlem iptal oldu!"));
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === ":white_check_mark:") {
        message.channel.send(
          `✅ İşlem onaylandı! ${u} adlı şahıs sunucudan banlandı!`
        );//Asperius Code
 
        message.guild.member(u).ban();
      }
    });//Asperius Code
  });
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,//Asperius Code
  aliases: ["banla"],
  permLevel: 0
};//Asperius Code

exports.help = {
  name: 'ban',//Asperius Code
  description: 'Asperius Code V12 Ban Komutu',
  usage: ''//Asperius Code
};