const express = require('express');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const app = express();
const Categoria = require('../models/categoria');

//==============================
//Mostrar todas las categorias
//==============================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({}).
    sort('descripcion').
    populate('usuario', 'nombre email').
    exec((err, categoriasBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Categoria.count({}, (err, conteoBD) => {
            res.status(200).json({
                ok: true,
                categoria: categoriasBD,
                cuantos: conteoBD
            });
        });
    });
});

//==============================
//Mostrar una categoria por ID
//==============================
app.get('/categoria/:id', verificaToken, (req, res) => {

    var id = req.params.id;
    Categoria.findById(id, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe una categoria con ese id'
                }
            });
        }
        res.status(200).json({
            ok: true,
            categoria: categoriaBD
        });


    });



});

//==============================
//Crear una categoria
//==============================
app.post('/categoria', verificaToken, (req, res) => {
    //regresar la nuevagoria
    let body = req.body;
    let usuario = req.usuario;

    let categoriaNueva = new Categoria({
        descripcion: body.descripcion,
        usuario: usuario._id

    });

    categoriaNueva.save((err, categoriaGuardada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
        if (!categoriaGuardada) {
            return res.status(400).json({
                ok: false,
                err: err
            });

        }

        res.status(200).json({
            ok: true,
            categoria: categoriaGuardada
        });
    });

});

//==============================
//Actualizar una categoria por ID
//==============================
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;
    let desCategoria = {
        descripcion: body.descripcion
    }
    Categoria.findByIdAndUpdate(id, desCategoria, { new: true, runValidators: true }, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe una categoria con ese id'
                }
            });
        }
        res.status(200).json({
            ok: true,
            categoria: categoriaBD
        });

    });

});
//==============================
//Borrar una categoria  por ID (Solo un administrador)
//==============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Categoria.findOneAndRemove(id, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe una categoria con ese id'
                }
            });
        }
        res.status(200).json({
            ok: true,
            message: 'Categoria Borrada'
        });

    });



});
module.exports = app;