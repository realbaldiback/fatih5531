const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const { MessageEmbed } = require('discord.js')

exports.run = async(client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send("Bir ses kanalında olman gerek")
    let asperius1 = message.mentions.members.first();
    if (!asperius1.voice.channel) return message.channel.send("Bu kullanıcı herhangi bir ses kanalında değil")
    if (!asperius1) return message.channel.send("Kullanıcı belirtmedin")
    if (message.member.voice.channel.id === asperius1.voice.channel.id) return message.channel.send("Zaten aynı kanaldasınız")

    const filter = (reaction, user) => {
        return ['tick', 'carp'].includes(reaction.emoji.name) && user.id === asperius1.id;
    };//// üst isim yazılcak    return ['tik2', 'x_'].includes(reaction.emoji.name) && user.id === kullanici.id; emoji ismi 
    let asperiuscod = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`${asperius1}, ${message.author}  ${asperius1.voice.channel.name} odasına gelmek istiyor. Kabul ediyormusun?`)
            .setFooter('Git Komutu Kullanıldı') 

    let mesaj = await message.channel.send(asperiuscod)
    await mesaj.react("820280181364228137") /// emoji id 
    await mesaj.react("811708936679981089")/// emoji id 
    mesaj.awaitReactions(filter, {
        max: 1,
        time: 30000,
        errors: ['time']
    }).then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === 'tick') {  /// emoji ismi 
            let asperius2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${asperius1} olduğu odaya çekildi`)
            message.channel.send(asperius2).then(msg => msg.delete(5000));
           message.member.voice.setChannel(asperius1.voice.channel)
        } else {
            let asperius = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${asperius1} odaya çekilme teklifini reddetti`)
            message.channel.send(asperius).then(msg => msg.delete(5000));
        }
    })  
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
 name: 'git',
 description: 'Kullanıcının yanına gider',
 usage: 'a!git @kullanıcı'
};