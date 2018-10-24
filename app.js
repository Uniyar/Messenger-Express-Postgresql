let express = require('express'),
	bodyParser = require('body-parser'),
	exphbs  = require('express-handlebars'),
	{ Pool, Client } = require('pg'),
	app = express();

const USER_SERVER = {
	name: 'pwkuyymryylgca',
	password: '1f10264803d3fbb548273870b7544c0b350cad494cb20e1cc94d692fab68534d',
	host: 'ec2-54-217-249-103.eu-west-1.compute.amazonaws.com',
	port: '5432',
	db: 'dbkul1fdfjrnkp',
	table: 'messenger'
}

const connect = `postgres://${USER_SERVER.name}:${USER_SERVER.password}@${USER_SERVER.host}:${USER_SERVER.port}/${USER_SERVER.db}`;

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
	const client = new Client({
	  connectionString: connect,
	  ssl: true
	});
	client.connect();

	client.query(`SELECT * FROM ${USER_SERVER.table}`, (err, res2) => {
	  res.render('home', {temp: res2.rows});
	  client.end();
	});

}); 

app.post('/add', function(req, res) {
	const client = new Client({
	  connectionString: connect,
  	  ssl: true
	});
	client.connect();

	client.query(`INSERT INTO ${USER_SERVER.table}(name, message) VALUES($1, $2)`, 
		[req.body.name, req.body.message], (err, res2) => {
	  		res.redirect('/');
	  		client.end();

		});
});

app.delete('/delete/:id', function(req, res) {
	const client = new Client({
	  connectionString: connect,
	  ssl: true
	});
	client.connect();

	client.query(`DELETE FROM ${USER_SERVER.table} WHERE id = $1`, 
		[req.params.id], (err, res2) => {
	  		client.end();
	  		res.sendStatus(200); 
		});
});

app.listen(process.env.PORT || 8080, function(){
	console.log('http://localhost:8080');
});
