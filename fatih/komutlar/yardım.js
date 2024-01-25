const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');//Asperius Code

exports.run = (client, message, args) => {
const yardım = new MessageEmbed()//Asperius Code
.setColor("ff0000")
.setAuthor("Asperius Code", client.user.avatarURL())
.setDescription(`Asperius Yardım Komutu`)//Asperius Code
.addField("• Genel", `
!ayarlar -> Koruma ayarlarını gösterir.
!afk -> Afk olmanızı sağlar.
!git @kullanıcı -> Etiketlenen kullanıcı kabul ederse yanına gidersiniz. 
!çek @kullanıcı -> Etiketlenen kullanıcı kabul ederse yanınıza çekersiniz.
!davet -> Davet linkini atar.
!istatistik -> Botun istatistiklerini atar.
`)
.addField("• Yetkili", `
!reklam-engel egel/sıfırla/log #kanal -> Reklam engel log kanalını ayarlar.
!küfür-engel engel/sıfırla/log #kanal -> Küfür engel korumasını açar.
!mute @kullanıcı 1 gün sebep -> Etiketlenen kullanıcıyı chat mute atar.
!unmute @kullanıcı -> Etiketlenen kullanıcının mutesini kaldırır.
!ses-mute @kullanıcı 1g sebep -> Etiketlenen kullanıcıya ses mute atar.
!ses-mute-kaldır @kullanıcı/<kullanıcı-id> -> Etiketlenen veya id si girilen kullanıcının ses mutesini kaldırır.
!jail @kullanıcı 1 gün sebep -> Etiketlenen kullanıcıya jail atar.
!unjail @kullanıcı -> Etiketket kullanıcının jailini kaldırır.
!kick @kullanıcı -> Etiketlenen kullanıcı sunucudan atar.
!ban @kullanıcı sebep -> Etiketlenen kullanıcıyı sunucudan banlar.
!unban id -> İd si girilen kullanıcının banını kaldırır.
`)
.setFooter("Asperius Code", message.author.avatarURL())
.setTimestamp()
message.channel.send(yardım)//Asperius Code
}
exports.conf = {
  aliases: ["y"],//Asperius Code
  permLevel: "0"//Asperius Code
}
exports.help = {
  name: "yardım"//Asperius Code
}