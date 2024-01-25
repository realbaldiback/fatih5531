const Discord = require("discord.js");

exports.run = async(client, message, args) => {
const davet = new Discord.MessageEmbed()
.setAuthor("Asperius", client.user.avatarURL())
.setDescription(`<a:altins:837302683484291082> Davet mesajı hazırlanıyor...`)

let mesaj = await message.channel.send(davet)
    setInterval(() => {
  const davet2 = new Discord.MessageEmbed()
 .setColor("f7ff00")
 .setAuthor("Carnoxis", client.user.avatarURL())
.setDescription(`
<a:altins:837302683484291082> Davet linkim için [tıkla](https://discord.com/oauth2/authorize?client_id=826528139877416961&scope=bot&permissions=8) 
<a:altins:837302683484291082> Destek sunucum için [tıkla](https://discord.gg/DKqcuzdU4Q)
`)
 .setFooter(`Carnoxis`, message.author.avatarURL())
 .setTimestamp() 
  
  mesaj.edit(davet2)
      mesaj.react("<:boost:837302683618115644>")
        }, 3000)  
}
exports.conf = {
  aliases: ["invite"],
  permLevel: 0
}
exports.help = {
  name: "davet"
}