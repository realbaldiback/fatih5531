const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;

module.exports = client => {
 setInterval(function() {
}, 8000);
  var msgArray = [
"Asperius Code",
"!yardım",
"",
 ];

 setInterval(() => {
  var rastgeleOyun = Math.floor(Math.random() * msgArray.length);
  client.user.setActivity(`${msgArray[rastgeleOyun]}`)
}, 5000);
    console.log(`Asperius başarıyla giriş yaptı.`);
}
