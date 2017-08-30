var CronJob = require('cron').CronJob;

var worker = require('./index.js')

new CronJob({
  cronTime: "0 */45 * * * *", 
  onTick: start(),
  start: true,
  timeZone: "America/Bogota"
});


function start() {

}