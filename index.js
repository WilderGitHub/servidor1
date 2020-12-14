const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0606",
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
            if (error) {
                console.log(error);
            }  else {
                console.log("en servidor POST" + resultado);
                res.json({
                    "artista": `${artista}`,
                    "pais": `${pais}`,
                    "genero": `${genero}`,
                    "ventas": `${ventas}`,
                    "id": `${resultado.insertId}`,

                });
            } 
        })
});
    
/* update */

app.put("/artistas/:id", (req, res) => {
    //console.log("antes del query, servidorx POST",req.body);
    
    const artista = req.body.artista;
        const pais = req.body.pais;
        const genero = req.body.genero;
        const ventas = req.body.ventas;
        const id = req.body.id;
    
        const consultaSQL = 'UPDATE artistas SET artista=?,pais=?,genero=?,ventas=? WHERE id=?';
        db.query(consultaSQL, 
            [artista, pais, genero, ventas,id],
            (error,resultado)=>{
            if (error) {
                console.log(error);
            }  else {
                console.log("en servidor UPDATE" + resultado);
                res.send(
                    //{
                    "hemos actualizado"
                    /* "artista": `${artista}`,
                    "pais": `${pais}`,
                    "genero": `${genero}`,
                    "ventas": `${ventas}`,
                    "id": `${resultado.insertId}`,
 */
                //}
                );
            } 
        })
    });
/* delete */

app.delete("/artistas/:id", (req, res) => {
    //console.log("antes del query, servidorx POST",req.body);
        
        const id = req.params.id;
    
        const consultaSQL = 'DELETE FROM artistas WHERE id=?';
        db.query(consultaSQL, 
            id,
            (error,resultado)=>{
            if (error) {
                console.log(error);
            }  else {
                console.log("en servidor DELETE" + resultado);
                res.send(
                    //{
                    "hemos borrado"
                    /* "artista": `${artista}`,
                    "pais": `${pais}`,
                    "genero": `${genero}`,
                    "ventas": `${ventas}`,
                    "id": `${resultado.insertId}`,
 */
                //}
                );
            } 
        })
    });


app.get("/artistas", (req, res) => {
    //res.send("nadita");
    const consultaSQL = 'SELECT * FROM artistas'; 
        db.query (consultaSQL, (err, result)=>{
            if (err) {
                console.log(err);
            } else {
                //console.log("en servidor GET" + result);
                res.send(result);
            }
        }) 
    });
///// temina /////// 


app.listen(3001, () => {
    console.log("estamos corriendo");
})