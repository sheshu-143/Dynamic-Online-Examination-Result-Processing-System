const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sheshu#123'
});
connection.connect((err) => {
    if (err) {
        console.error('Connection failed:', err.message);
        process.exit(1);
    }
    console.log('Connected to MySQL server.');
    connection.query('SHOW DATABASES', (err, results) => {
        if (err) console.error(err);
        else console.log(results.map(r => r.Database));
        process.exit(0);
    });
});
