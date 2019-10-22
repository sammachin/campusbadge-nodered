const mustache = require("mustache");

module.exports = function(RED) {
  function campusbadge(config) {
    RED.nodes.createNode(this, config);
    var node = this;
	this.tone = config.tone;
	this.time = config.time;
    this.led1 = config.led1;
    this.led2 = config.led2;
    this.led3 = config.led3;
    this.led4 = config.led4;
    this.led5 = config.led5;
    this.text = config.text;
    node.on('input', function(msg) {
		var data = dataobject(this.context(), msg)
		this.badgeid = mustache.render(config.badgeid, data)
		this.text = mustache.render(config.text, data)
		this.time = mustache.render(config.time, data)
		this.tone = mustache.render(config.tone, data)
      	msg.payload = {}
		if (this.text != ''){
			msg.payload.t = this.text
		}
		if (this.time != ''){
			msg.payload.f =  this.tone;
        	msg.payload.d = this.time;
		}
		msg.payload.l = []
        var d = hexToRgb(this.led1)
        msg.payload.l.push(d.g)
        msg.payload.l.push(d.r)
        msg.payload.l.push(d.b)
        d = hexToRgb(this.led2)
        msg.payload.l.push(d.g)
        msg.payload.l.push(d.r)
        msg.payload.l.push(d.b)
        d = hexToRgb(this.led3)
        msg.payload.l.push(d.g)
        msg.payload.l.push(d.r)
        msg.payload.l.push(d.b)
        d = hexToRgb(this.led4)
        msg.payload.l.push(d.g)
        msg.payload.l.push(d.r)
        msg.payload.l.push(d.b)
        d = hexToRgb(this.led5)
        msg.payload.l.push(d.g)
        msg.payload.l.push(d.r)
        msg.payload.l.push(d.b)
      	msg.topic = "/badge/"+this.badgeid+"/message"
      	node.send(msg);  
    });
}  
 RED.nodes.registerType("campusbadge",campusbadge);      
}

function dataobject(context, msg){
  data = {}
  data.msg = msg;
  data.global = {};
  data.flow = {};
  g_keys = context.global.keys();
  f_keys = context.flow.keys();
  for (k in g_keys){
    data.global[g_keys[k]] = context.global.get(g_keys[k]);
  };
  for (k in f_keys){
    data.flow[f_keys[k]] = context.flow.get(f_keys[k]);
  };
  return data
}



function clean(obj) {
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
      delete obj[propName];
    }
  }
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}