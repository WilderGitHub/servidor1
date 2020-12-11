const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const { response } = require('express');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gente"
    //insecureAuth : true
});

app.post("/crear", (req, res) => {
console.log("antes del query, servidorx POST",req.body);
    const nombre = req.body.nombre;
    const edad = req.body.edad;

    db.query('INSERT INTO family (nombre,edad) VALUES (?,?)',
        [nombre, edad],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    
                    res.send(result);
                    console.log("servidor POST");
                }
            }); 
});
app.get("/familia", (req, res) => {

const consultaSQL = 'SELECT * FROM family ORDER BY id ASC';
    db.query (consultaSQL, (err, result)=>{
        if (err) {
            console.log(err);
        } else {
            console.log("en servidor GET" + result);
            res.send(result);
        }
    }) 
});
app.get("/familia/:id", (req, res) => {
    const id = req.params.id;
    //const consultaSQL = 'SELECT * FROM familia WHERE id=?';
        db.query ('SELECT * FROM family WHERE id=?',
        [id],
        (err, result)=>{
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    });
    
////comienza////////
app.post("/artistas", (req, res) => {
    console.log("antes del query, servidorx POST",req.body);
        const artista = req.body.artista;
        const pais = req.body.pais;
        const genero = req.body.genero;
        const ventas = req.body.ventas;

        db.query('INSERT INTO artistas (artista,pais,genero,ventas) VALUES (?,?,?,?)',
            [artista, pais, genero, ventas],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        
                        res.send(result);
                        console.log("servidor POST");
                    }
                }); 
    });
    app.get("/artistas", (req, res) => {
    
    const consultaSQL = 'SELECT * FROM artistas';
        db.query (consultaSQL, (err, result)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("en servidor GET" + result);
                res.send(result);
            }
        }) 
    });
///// temina ///////


app.listen(3001, () => {
    console.log("estamos corriendo");
})