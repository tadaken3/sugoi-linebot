var CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("acces_token");
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';

function doPost(e) {
  var reply_token= JSON.parse(e.postData.contents).events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  
  var user_message = JSON.parse(e.postData.contents).events[0].message.text;
  var reply_messages = ['ごめん。わからなかった。。。ところでジムに行ったのかい？'];
  
  if (user_message.match(/ジム/)) {
    reply_messages = ['すごい'];
    
  } else if (user_message.match(/走った/)) {
    reply_messages = ['すごい'];
  }
  else if (user_message.match(/寂しい/)) {
    reply_messages = ['君はひとりじゃない'];
  }
  
  var messages = reply_messages.map(function (v) {
    return {'type': 'text', 'text': v};
  });
  
  
  UrlFetchApp.fetch(line_endpoint, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages,
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}


function checkToken(){
  Logger.log(CHANNEL_ACCESS_TOKEN)
}