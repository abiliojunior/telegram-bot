'use strict'
console.log('Olá!')

var request = require('request')
const urlApi = 'http://localhost:3001'
var Telegram = require('telegram-node-bot')
var TelegramBaseController = Telegram.TelegramBaseController
var TextCommand = Telegram.TextCommand
var chatbot = new Telegram.Telegram('444210784:AAGQF8oPFs3wxskE59bCAah8NtpbbqS6JKw')

class EventsController extends TelegramBaseController {

  sendMessage(scope,msg){
    scope.sendMessage(msg)
  }
    allEventsAction(scope) {
      let pathApi = '/allevents'
      let msg = ''

      request.get(`${urlApi}${pathApi}`, (error, response, body) => {
        msg += JSON.parse(body).map((event) => `${event.data.toString().replace(/,/g, ' e ')} - ${event.name} - ${event.link}\n`)
        this.sendMessage(scope, msg.replace(/,/g, ''))
      })
    }
 
  
    get routes() {
      return {
        'frases': 'allEventsAction'
      }
    }
  }
  chatbot.router
         .when(
           new TextCommand('/frases', 'frases'), new EventsController()
         )