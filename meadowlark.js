var express = require('express'); 
var app = express(); 
var fortune = require("./mod_library/fortune.js")
// set up handlebars view engine 
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' }); 



app.engine('handlebars', handlebars.engine); 
app.set('view engine', 'handlebars'); 

app.set('port', process.env.PORT || 3000); 

app.use(express.static(__dirname + '/public'));



//create routes for html pgs
app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	
	res.render("about", {fortune: fortune}
		);

}); 



// custom 404 page 
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
}); 

//500 page
app.use(function(req, res){
	console.error(err.stack);
	res.status(500);
	res.render("500");
});

app.listen(
	app.get('port'), function(){
		console.log( 'Express started on http://localhost:' +app.get('port') + '; press Ctrl-C to terminate.' ); 
}); 