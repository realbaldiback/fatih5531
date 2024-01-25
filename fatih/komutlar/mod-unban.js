const Discord = require('discord.js');
const db = require('quick.db');
const Client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : '').setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif').setTitle('Bir hata oldu!').setDescription(`• \`${client.ayarlar.prefix}unban \` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`));
  if(!args[0]) return message.reply('Yasak kaldırmak için lütfen doğru kullanıcı **ID** girin.')

  message.guild.fetchBans().then(bans => {
  if(bans.has(args[0])) {
  return message.channel.send(new Discord.MessageEmbed().setTitle('Bir hata oldu!').setDescription('**ID** göre kullanıcı bulunamadı. **ID** doğru olduğundan emin ol, Ve ya kullanıcı yasaklı değil.')); }
  message.guild.ban(args[0],).then(async (member) => {
      
  let user;
  if (member instanceof Discord.GuildMember) { user = member.user; }
  else if (member instanceof Discord.User) { user = member;
  } else { user = await client.users.fetch(member); }
  if(!user) return message.channel.send(new Discord.MessageEmbed().setTitle('Bir hata oldu!').setDescription('**ID** göre kullanıcı bulunamadı. **ID** doğru olduğundan emin ol, Ve ya kullanıcı yasaklı değil.'));
  message.guild.members.unban(user.id);
  message.channel.send(`${user.tag} kullanıcısının banı açıldı.`);
  })});
  
}
exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı
  guildOnly: true, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ["ban-kaldır"], //Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "unban" //Komutun adı (Komutu girerken lazım olucak)
};