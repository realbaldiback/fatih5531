const Discord = require('discord.js');
const db = require('quick.db');
const database = require('quick.db')
const ayarlar = require('../ayarlar.json');
const ms = require('ms');
const moment = require('moment');
moment.locale('tr');

exports.run = async(client, message, args) => {
    let mutelog = "log id"
    let logChannel = await message.guild.channels.cache.get(mutelog);
    let mutelirol = "muteli rol id"
    let muteci = "muteci rol id"
    let alrol = "alınacak rol id"

    if(!message.member.roles.cache.has(muteci)) return message.channel.send(`<a:twitchbit:793899916614828062> Bu komudu kullanabilmen için <@&${muteci ? muteci: 'Yok.'}> adlı role sahip olman lazım!`)

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

member.roles.add(mutelirol);
member.roles.remove(alrol);
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setTitle('Birisi susturuldu!')
.setColor('RED')
.setDescription(`**• Moderatör**: ${message.author}
**• Susturulan**: <@!${member.user.id}>
**• Sebep**: ${reason}
**• Bitiş zamanı:**: ${moment(end+ms('3h')).format('DD.MM.YYYY - HH:mm:ss')}`);
message.channel.send(`Başarılı, ***${member.user.tag}*** susturuldu.`);
logChannel.send(embed);
setTimeout(() => {
return member.roles.remove(mutelirol).then(() => database.delete(member.user.id) && logChannel.send(embed.setColor('GREEN').setTitle('Susturulması açıldı.').setDescription(`**• Moderatör**: ${message.author}
**• Susturulan**: <@!${member.user.id}>
**• Sebep**: ${reason}`)));
}, ms(args[1]+' '+args[2].replace('dakika', 'minutes').replace('saat', 'hours').replace('saniye', 'seconds').replace('gün', 'day')));

}
exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı
  guildOnly: true, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ["sustur"], //Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "mute" //Komutun adı (Komutu girerken lazım olucak)
};