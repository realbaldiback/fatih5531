const Discord = require('discord.js');
const db = require('quick.db');
const database = require('quick.db')
const ayarlar = require('../ayarlar.json');
const ms = require('ms');
const moment = require('moment');
moment.locale('tr');

exports.run = async(client, message, args) => {
    let mutelog = "Mute Log İd"
    let logChannel = await message.guild.channels.cache.get(mutelog);
    let mutelirol = "Muteli Rol İd"
    let muteci = "Mute Yetkilisi İD"
    let verrol = "verilecek rol id"

    if(!message.member.roles.cache.has(muteci)) return message.channel.send(`<a:twitchbit:793899916614828062> Bu komudu kullanabilmen için <@&${muteci}> adlı role sahip olman lazım!`)

    if(!args[0]) return message.channel.send('Bir kullanıcıyı etiketlemelisin.');
if(!message.mentions.members.first()) return message.channel.send('Etiketlediğin kullanıcıyı bulamıyorum.');
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send('Etiketlediğin kullanıcıyı bulamıyorum.');


member.roles.remove(mutelirol);
member.roles.add(verrol);
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setTitle('Birisinin susturulması kaldırıldı!')
.setColor('RED')
.setDescription(`**• Moderatör**: ${message.author}
**• Susturması kaldırılan**: <@!${member.user.id}>`);
message.channel.send(`Başarılı, ***${member.user.tag}*** susturulması kalktı.`);
logChannel.send(embed);

}
exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı
  guildOnly: true, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ["unmute"], //Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "mute-kaldır" //Komutun adı (Komutu girerken lazım olucak)
};