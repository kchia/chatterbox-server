utils={};
utils.randomMessage=function(){
  var adj=["ever lovin'","dang","stupid","blasted"];
  var noun=["ajax","http errors","xss","404"];
  return _.sample(adj)+" "+_.sample(noun);
};

utils.isSanitary=function(str){
  return !( /<script/gi.test(str) );
};