const { Client } = require('pg')
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended : false});
const server = {host : '127.0.0.1', port : 4000};
const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'test',
  password: 'root',
  port: 5432,
})

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));


app.get('*', function(req, res){
	let array;
	new Promise(function(response, reject){
		client.connect(function(err) {
			client.query("SELECT * FROM test", function(error, result){
				array = result;
				array = array.rows;
				// console.log(array.rows);
				const size = Math.sqrt(array.length);
				params = {array : JSON.stringify(array), size : size, parameters: JSON.stringify(require('./parameters.json')), params: require('./parameters.json'), master_vector: require('./master_vector.json'), solution: JSON.stringify(require('./solution.json'))};
				// console.log(params);
				res.render('index.ejs', params);
			});
		});
	})
});

app.listen(server.port, server.host);
console.log(server);