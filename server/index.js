require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.connect((err) => {
if (err) {
    console.log('error connecting: ' + err.stack);
    return;
}
console.log('DB Connection success.');
});

app.get('/api/get', (req, res) => {
    const slqSelect = "SELECT * FROM movie_reviews;";
    db.query(slqSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
    const movie_name = req.body.movie_name;
    const movie_review = req.body.movie_review;
    const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?);"; //配列の値が?に入る
    db.query(sqlInsert, [movie_name, movie_review], (err, result) => {
        console.log(result);
    });
    
    res.status(200).end();
})

app.delete('/api/delete', (req, res) => {
    const id = req.body.id;
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = '?';";

    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err, id);
    })
    res.status(200).end();
})
// app.delete('/api/delete/:movie_name', (req, res) => {
// const name = req.params.movie_name; でも受け取れる

app.put('/api/update', (req, res) => {
    const id = req.body.id;
    const review = req.body.movie_review;
    const slqUpdate = "UPDATE movie_reviews SET movie_review = ? WHERE id = ?;";

    db.query(slqUpdate, [review, id], (err, result) => {
        if (err) console.log(err);
    })
    res.status(200).end();
})

app.listen(3001, () => {
    console.log('running on port 3001');
});
