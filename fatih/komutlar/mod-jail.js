const Discord = require('discord.js');
const db = require('quick.db');
const database = require('quick.db')
const ayarlar = require('../ayarlar.json');
const ms = require('ms');
const moment = require('moment');
moment.locale('tr');

exports.run = async(client, message, args) => {
    let jaillog = ""
    let logChannel = await message.guild.channels.cache.get(jaillog);
    let jailrol = "Jailli rol"
    let jailci = "Jailci rol id"
    let alınacakrol = "rol id"

    if(!message.member.roles.cache.has(jailci)) return message.channel.send(`<a:twitchbit:793899916614828062> Bu komudu kullanabilmen için <@&${jailci}> adlı role sahip olman lazım!`)

    if(!args[0]) return message.channel.send('Bir kullanıcıyı etiketlemelisin.');
if(!message.mentions.members.first()) return message.channel.send('Etiketlediğin kullanıcıyı bulamıyorum.');
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send('Etiketlediğin kullanıcıyı bulamıyorum.');

let argument_one = ['saniye', 'dakika', 'saat', 'gün'];
if(!args[1]) return message.channel.send(`Bir süre belirtmelisin.\nÖrnek: !mute ${message.mentions.members.first()} 5 gün reklam`);
if(!args[2]) return message.channel.send(`Geçerli bir zaman belirtmelisin.\n${argument_one.map(a => `**${a}**`).join('/')}`)
if(!argument_one.includes(args[2])) return message.channel.send(`Geçerli bir zaman belirtmelisin.\n${argument_one.map(a => `**${a}**`).join('/')}`)

let reason = 'Bir sebep girilmemiş.';
if(args[3]) reason = args.slice(3).join(' ');
let end = Date.now()+ms(args[1]+' '+args[2].replace('dakika', 'minutes').replace('saat', 'hours').replace('saniye', 'seconds').replace('gün', 'day'));

database.set(member.user.id, { 
end: end,
start: Date.now(),
moderatorUsername: message.author.username,
moderatorID: message.author.id,
moderatorAvatarURL: message.author.displayAvatarURL({ dynamic: true }),
reason: reason
});

member.roles.add(jailrol);
  member.roles.remove(alınacakrol);
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setTitle('Birisi jaillendi!')
.setColor('RED')
.setDescription(`**• Moderatör**: ${message.author}
**• Jaillenen**: <@!${member.user.id}>
**• Sebep**: ${reason}
**• Bitiş zamanı:**: ${moment(end+ms('3h')).format('DD.MM.YYYY - HH:mm:ss')}`);
message.channel.send(`Başarılı, ***${member.user.tag}*** jaillendi.`);
logChannel.send(embed);
setTimeout(() => {
return member.roles.remove(jailrol).then(() => database.delete(member.user.id) && logChannel.send(embed.setColor('GREEN').setTitle('Jaili açıldı.').setDescription(`**• Moderatör**: ${message.author}
**• Jaillenen**: <@!${member.user.id}>
**• Sebep**: ${reason}`)));
}, ms(args[1]+' '+args[2].replace('dakika', 'minutes').replace('saat', 'hours').replace('saniye', 'seconds').replace('gün', 'day')));

}
exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı
  guildOnly: true, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ["hapis"], //Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "jail" //Komutun adı (Komutu girerken lazım olucak)
};