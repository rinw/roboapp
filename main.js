var http = require('http')
var mysql = require('mysql')

var query = function(sql, callback) {

	var conn_args = {
		host     : 'localhost',
		user     : 'root',
		password : 'qwe321',
		database : 'roboschema'
	}
	
	var connection = mysql.createConnection(conn_args)

	connection.connect()

	connection.query(sql, function(err, rows, fields) {
		if (!err)
			callback(rows, fields)
		else {
			console.log('Error while performing Query.')
			process.exit()
		}
	})

	connection.end()
}

var handle_request = function(req, res) {

	var sql = 'SELECT * from users'
	var callback = function(rows, fields) {
		console.log('The solution is: ', rows)
	}
	query(sql, callback)

	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.end('Hello World\n')
}

var server = http.createServer(handle_request)
server.listen(8080, '127.0.0.1')
console.log('Server running at http://127.0.0.1:8080/')
