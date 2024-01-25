const Discord = require('discord.js');
const db = require('quick.db');
const Client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {    
let prefix = ayarlar.prefix
let rol = message.mentions.roles.first() 
let kanal = message.mentions.channels.first()
const hata = new Discord.MessageEmbed()
.setAuthor("Asperius Code", client.user.avatarURL())
.setDescription(`
Lütfen ne yapmak istediğinizi belirtiniz!
!otorol rol @rol #kanal -> Otorol verilecek rol ve log unu ayarlar.
!otorol mesaj <mesaj> -> Otorol mesajını ayarlar.
!otorol sıfırla -> Otorol verilerini sıfırlar
`)
.setFooter("Asperius Code", message.author.avatarURL())
.setTimestamp()
if(args[0] !== "rol" && args[0] !== "mesaj" && args[0] !== "sıfırla") return message.channel.send(hata)
if(args[0] === "rol") {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:olur:806189416384167946>  **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
 
 if(!rol) return message.channel.send(`<a:olur:806189416384167946>  **Lütfen Bir Rol Belirt!**\nRolü Etiketleyemiyorsan **Rolün Etiketleme Seçeneğini Aktif Etmeyi Unutma** \n**__Örnek Kullanım__** : \`${prefix}otorol @rol #kanal\`\n\n**__Önemli Not!!__**: **Oto Rol'u Ayarlayabilmek İçin Botun Rolü, Verilecek Rolün Üstünde Bir Rolde Olmalı Yoksa Rolü Veremez!** `)
 
 if(!kanal) return message.channel.send(`<a:olur:806189416384167946>   **Lütfen Bir Kanal Belirt!** \n**__Örnek Kullanım__** : \`${prefix}otorol @Rol #Kanal\``)
 
  message.channel.send(`╔▬▬▬▬▬▬▬▬Carnoxis Otorol▬▬▬▬▬▬▬▬▬
║► <a:olur:806189416384167946> Otorol Aktif Edildi.
║► <a:olur:806189416384167946>  **${rol}** Olarak Güncelledim! 
║► <a:olur:806189416384167946>  Otorol Kanalını **${kanal}** Olarak Güncelledim! 
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)

 
  db.set(`otoRL_${message.guild.id}`, rol.id)  
  db.set(`otoRK_${message.guild.id}`, kanal.id)  
}
if(args[0] === "mesaj") {
    
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:carp:811708936679981089> **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
  
  let mesaj = args.slice(1).join(' ');
  if(mesaj.length < 5) return message.channel.send('<a:carp:811708936679981089> **Sayaç Hoşgeldin Mesaj Sistemi İçin En Az 5 Karakter Belirtebilirsin!**\n **__Örnek__**: `otorol-mesaj -uye- Hoşgeldin! senle beraber -uyesayisi- Kişiyiz!` \n **Otorol mesajı belirtmeler:** -uye- Gelen üyenin adını atar \n -uyetag- Gelen üyenin tagını atar \n -rol- Verilen rolün ismini atar. \n -server- Sunucu ismini atar. \n -uyesayisi- Sunucudaki üye sayısını atar. \n -botsayisi- Sunucudaki bot sayısını atar. \n -bolge- Sunucu bölgesini atar. \n -kanalsayisi- Sunucudaki kanal sayısını atar.')
  
 message.channel.send('<a:olur:806189416384167946> **Oto Rol mesajı** `'+mesaj+'` **Olarak ayarlandı!**') 
 db.set(`otoRM_${message.guild.id}`, mesaj)  
  
}
if(args[0] === "sıfırla") {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:by:752306236606906399> **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
 const rol = db.get(`otoRL_${message.guild.id}`)  
 if(!rol) return message.reply(`<a:by:752306236606906399>  **Bu özellik zaten kapalı! **`)
 
 
  message.channel.send(`<a:hg:752305081545916438>  **Otorol Sistemi başarılı bir şekilde kapatıldı.**`)

 
  db.delete(`otoRL_${message.guild.id}`)  
  db.delete(`otoRK_${message.guild.id}`) 
  db.delete(`otoRM_${message.guild.id}`)   
}  
}
exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı
  guildOnly: true, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: [], //Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "otorol" //Komutun adı (Komutu girerken lazım olucak)
};