var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});

app.get('/showdata',function(req,res){
  var getRequests = [];
  for (var p in req.query){
    getRequests.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = getRequests;
  res.render('showdata',context);
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});

app.post('/postdata', function(req,res){
  var postData = [];
  for(var p in req.body){
    postData.push({'name':p,'value':req.body[p]})
  } 
  var context = {};
  context.dataList = postData;
  res.render('postdata', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
