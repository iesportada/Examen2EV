const router = require('express').Router();

const PersonajeMS = require('../models/personajeMS');
const db = require('../models/index');

router.post('/guardar', async function(req, res, next) {
    try {
        const { id } = req.body; // id recogido de la petición post
        console.log(`Registro a guardar recibido: ${id}`);
        const miPersonaje = await PersonajeMS.find( {id: parseInt(id)});
        
        //console.log(miPersonaje[0]);
        let bichoExiste = await db['personajeSQ'].findOne( {
            where: { id: parseInt(id)}
        });

        if (bichoExiste == null)
        {
            let salida = {};

            salida['id'] = miPersonaje[0].id;
            salida['name'] = miPersonaje[0].name;
            salida['image'] = miPersonaje[0].image;
            salida['url'] = miPersonaje[0].url;
            salida['created'] = miPersonaje[0].created.toISOString().split('T')[0];
            
            db['personajeSQ'].create(salida);
        }
        res.redirect('/personaje/mosaico');
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('/mosaico', async function(req, res, next) {
    try {
        const listaBichos = await PersonajeMS.find({ });
        res.render('mosaico', {
                titulo: 'Lista completa',
                listado: listaBichos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('/listado', async function(req, res, next) {
    try {
        const listaBichos = await PersonajeMS.find({ });
        res.render('listado', {
                titulo: 'Lista completa',
                listado: listaBichos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('*', function (req, res) {
  res.redirect('/');
});

module.exports = router;
