// YOUR CODE HERE:

var app={};

//state
app.m={};
app.m.appName="Chatterbox";
app.m.messages={};

//state-changing-logic
app.c={};

app.c.init=function(){
  app.c.getMessages();
  app.v.initialReveal();
};

app.c.getMessages=function(){
  var url='https://api.parse.com/1/classes/chatterbox';
    
  $.ajax({
      // always use this url
      url: url,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        //console.log(data);
        for (var i=0;i<data.results.length;i++){
          if (!app.m.messages[data.results[i].objectId] && utils.isSanitary(data.results[i].text) ){
            app.m.messages[data.results[i].objectId]=data.results[i];
          }
        }
        //app.m.messages=data.results;
        app.v.displayMessages();
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get messages');
      }
    }
  );
};

app.c.postMessage=function(messageText){
  var url='https://api.parse.com/1/classes/chatterbox';
  var message= {
    'username': 'luke',
    'text': messageText,
    'roomname': '4Chan'
  };
  
  console.log(message);
  
  $.ajax({
      // always use this url
      url: url,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        console.log(data);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    }
  );
};

//display logic
app.v={};

app.v.initialReveal=function(){
  var layout=app.t.layout;
  $(document).ready(function(){
    $("body").hide();
    $("body").html(layout() );
    $("body").fadeIn();
  });
};

app.v.displayMessages=function(messages){
  var messages=messages||app.m.messages;
  for (var key in messages){
    if ($("div#"+key).length===0){
      $("div#messages").prepend(app.t.message(messages[key]) );
    }
  }
  setTimeout(app.c.getMessages,3000);
};

app.v.clickListen=function(selector,callback){
  var key=JSON.stringify(selector);
  if (!this.clickListen.mem[key]){
    var args=_.rest(arguments,2);
    $("body").on("click",selector,function(){callback.apply(null,args);});
    this.clickListen.mem[key]=true;
  }  
};

app.v.clickListen.mem={};

//templates
app.t={};

app.t.message=function(message){
  var d="";
  d+="<div class='message' id='"+message.objectId+"'>";
    d+="<h3 class='username'>"+message.username+"</h3>";
    d+="<p class='text'>"+message.text+"</p>";
  d+="</div>";
  return d;
};

app.t.messages=function(messages){
  var d="";
  for (var key in messages){
    d+=app.t.message(messages[key]);
  }
  return d;
};

app.t.inputArea=function(){
  
  app.v.clickListen("div#input-area input[type=button]",function(){
    var text=$("div#input-area input[type=text]").val();
    app.c.postMessage(text);
  });
  
  var d="";
  d+="<div id='input-area'>";
    d+="<input type='text' placeholder='your message here'></input>";
    d+="<input type='button' value='submit'></input>";
  d+="</div>";
  return d;
};

app.t.layout=function(){
  var d="";
  d+="<div id='main'>";
    d+="<h1>"+app.m.appName+"</h1>";
    d+=app.t.inputArea();
    d+="<div id='messages'>";
      d+=app.t.messages(app.m.messages);
    d+="</div>";
  d+="</div>";
  return d;
};

//Zhu Li, do the thing
$(document).ready(app.c.init);