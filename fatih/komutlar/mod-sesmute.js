const data = require('quick.db')
const ayarlar = require('../ayarlar.json')
const Discord = require('discord.js')
const ms = require('ms')

exports.run = async(client, message, args) => {
const logChannel = "log id"
const muteYetkili = "Mute Yetkilisi İd"

const errorEmbed = new Discord.MessageEmbed()
.setColor('RED');
const errorEmbed2 = new Discord.MessageEmbed()
.setTitle('Bir hata oldu! <a:carp:811708936679981089 >');

if(!message.member.permissions.has(muteYetkili)) return message.channel.send(errorEmbed.setDescription(`${message.guild.roles.cache.get(muteYetkili)} | Rolüne sahip olman gerekiyor.`));
if(!args[0]) return message.channel.send(errorEmbed.setTitle('Bir hata oldu! <a:carp:811708936679981089 >').setDescription(`Kullanıcı etiketleyerek dener misin?
**Örnek olarak**:
\`\`\`!sesmute @üyeetiketi 1m merhaba
!sesmute 686185592899633200 1m merhaba\`\`\``));

let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first();
} else if(args[0]) {
member = message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(errorEmbed.setTitle('Bir hata oldu! <a:carp:811708936679981089 >').setDescription(`Kullanıcı etiketleyerek dener misin?
**Örnek olarak**:
\`\`\`!ses-mute @üye 1m merhaba
!sesmute 686185592899633200 1m merhaba\`\`\``));
}

if(!member.voice.channel){
    return message.channel.send(`Kullanıcı sesli kanalda değil`)
}


if(message.author.id === member.id) return message.channel.send(new Discord.MessageEmbed().setColor('#9c5cb2').setTitle('Agaa beeeeeeeee!').setDescription(`O kadar yürekli olamazsın.. 🙄`))
if(member.permissions.has('ADMINISTRATOR')) return message.channel.send(errorEmbed2.setDescription('Yönetici bir kullanıcıya karışamam!'));

if(!args[1]) return message.channel.send(errorEmbed.setTitle('Bir hata oldu! <:notick:777580585085829150>')
.setDescription(`${message.author} **Süre** Belirtmeyi unutma lütfen! \`1s & 1m & 1h & 1d\` kullanarak dener misin?
**Örnek olarak**:
\`\`\`!sesmute @üyetiketi 1m merhaba\`\`\``));

let cooldown = ms(args[1]);
let reason;
if(args[2]) reason = args[2];
if(!args[2]) reason = 'Bir açıklama yok.';


message.guild.channels.cache.get(logChannel).send(new Discord.MessageEmbed()
.setColor('#00001')
.setTitle('Asperius - Sesli Mute Sistem')
.setDescription(`
<a:sag:779313442825568276> **Kullanan Yetkili:** \`${message.author.tag}\`
<a:sag:779313442825568276> **Kullanılan kişi:** \`${member.user.tag}\`
<a:sag:779313442825568276> **Açıklama:** \`${reason}\`
<a:sag:779313442825568276> **Ceza Süre:** \`${args[1]}\``)
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png'));
member.voice.setMute(true);

setTimeout(() => {

message.guild.channels.cache.get(logChannel).send(new Discord.MessageEmbed()
.setTitle('Asperius - Sesli  Mute Sistem').setColor('#f1c335')
.setDescription(`
<a:sag:779313442825568276> ${member.user} **kullanıcısının sesli mute süresi bitti!**
`))
member.voice.setMute(false);
}, cooldown);
}
exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı
  guildOnly: true, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ["ses-mute"], //Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "ses-mute" //Komutun adı (Komutu girerken lazım olucak)
};