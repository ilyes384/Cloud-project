const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'db'
};
const cors = require('cors');
app.use(cors());

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL');

    // API endpoint to fetch data
    app.get('/api/data', (req, res) => {
        connection.query('SELECT * FROM data', (error, results) => {
            if (error) {
                console.error('Error fetching data from MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(results);
            }
        });
    });

    // API endpoint to update data
    app.post('/api/data', (req, res) => {
        const newData = req.body;
        connection.query('INSERT INTO data SET ?', newData, (error) => {
            if (error) {
                console.error('Error updating data in MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'Data updated successfully' });
            }
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
