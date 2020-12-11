const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gente"
    
});

    
////comienza////////
app.post("/artistas", (req, res) => {
    //console.log("antes del query, servidorx POST",req.body);
    
    const artista = req.body.artista;
        const pais = req.body.pais;
        const genero = req.body.genero;
        const ventas = req.body.ventas;
        //const id = req.body.id;
    
        const consultaSQL = 'INSERT INTO artistas (artista,pais,genero,ventas) VALUES (?,?,?,?)';
        db.query(consultaSQL,
            [artista, pais, genero, ventas],
            (error,resultado)=>{
           // if (error) {
             //   console.log(error);
            //} else {
                console.log("en servidor POST" + resultado);
               // res.json(resultado);
            //}
        })
    });
    app.get("/artistas", (req, res) => {
    
    const consultaSQL = 'SELECT * FROM artistas'; 
        db.query (consultaSQL, (err, result)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("en servidor GET" + result);
                res.json(result);
            }
        }) 
    });
///// temina /////// 


app.listen(3001, () => {
    console.log("estamos corriendo");
})