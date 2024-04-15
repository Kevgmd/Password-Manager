const express = require('express');
const app = express();
const port = 3306;
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'spectacularlysecret123##',
    database: 'password_manager'
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Serve CSS file
app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles.css');
});

// Serve JavaScript file
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
});

app.use(express.static('Password-Manager'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/Password-Manager/insert-data', (req, res) => {

    const { password } = req.body;

    pool.query('INSERT INTO name (password) VALUES (?)', [password], (err, result1) => {
        if (err) {
            console.error('Error inserting name into name table:', err);
            res.status(500).send('Error inserting name into name table');
            return;
        }

        pool.query('INSERT INTO email (password) VALUES (?)', [password], (err, result2) => {
            if (err) {
                console.error('Error inserting email into email table:', err);
                res.status(500).send('Error inserting email into email table');
                return;
            }

            pool.query('INSERT INTO password (password) VALUES (?)', [password], (err, result3) => {
                if (err) {
                    console.error('Error inserting password into password table:', err);
                    res.status(500).send('Error inserting password into password table');
                    return;
                }

                res.send('password inserted into all tables successfully');
            });
        });
    });
});

app.get('/Password-Manager/get-data', (req, res) => {

    pool.query('SELECT * FROM name', (err, rows) => {
        if (err) {
            console.error('Error retrieving name:', err);
            res.status(500).send('Error retrieving name');
            return;
        }
        res.json(rows);

        pool.query('SELECT * FROM email', (err, rows) => {
            if (err) {
                console.error('Error retrieving email:', err);
                res.status(500).send('Error retrieving email');
                return;
            }
            res.json(rows);

            pool.query('SELECT * FROM password', (err, rows) => {
                if (err) {
                    console.error('Error retrieving password:', err);
                    res.status(500).send('Error retrieving password');
                    return;
                }

                res.json(rows);
            });
        });
    });
});