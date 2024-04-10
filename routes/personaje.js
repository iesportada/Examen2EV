const router = require('express').Router();

const PersonajeMS = require('../models/personajeMS');
const db = require('../models/index');
const entidad = 'personajeSQ'

// Eliminamos el registro de la BBDD sqlite
router.post('/borrar', async function(req, res) {
    const { id }  = req.body;
  
    try {
      db[entidad].destroy({ where: {id: parseInt(id) } });
      res.redirect('/personaje/salvado/');
      
    } catch (error) {
      console.error('Error al eliminar:', error);
      res.status(500).json({ error: 'Error interno del servidor en delete' }); 
    }
  });

router.post('/guardar', async function(req, res, next) {
    try {
        const { id } = req.body; // id recogido de la petición post
        console.log(`Registro a guardar recibido: ${id}`);
        const miPersonaje = await PersonajeMS.find( {id: parseInt(id)});
        
        //console.log(miPersonaje[0]);
        let bichoExiste = await db[entidad].findOne( {
            where: { id: parseInt(id)}
        });

        if (bichoExiste == null)
        {
            let salida = {};

            salida['id'] = miPersonaje[0].id;
            salida['name'] = miPersonaje[0].name;
            salida['image'] = miPersonaje[0].image;
            salida['url'] = miPersonaje[0].url;
            salida['gender'] = miPersonaje[0].gender;
            salida['created'] = miPersonaje[0].created.toISOString().split('T')[0];
            
            db[entidad].create(salida);
        }
        res.redirect('/personaje/salvado');
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('/mosaico', async function(req, res, next) {
    try {
        const listaBichos = await PersonajeMS.find({ });
        res.render('mosaico', {
                titulo: 'Mosaico',
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

// Leemos todos los registros localmente desde sqlite
router.get('/salvado', async function(req, res) {
    try {
      const listado = await db[entidad].findAll({ raw: true }); 
      console.log(listado);
      res.render('salvado', { listado });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ error: 'Error interno del servidor en get' }); 
    }
});

// Get one personaje
router.get('/:id', async (req, res) => {
  
    const { id } = req.params;
    
    // const { name, gender, image, url } = req.body;
  
    try {
        const unBicho = await PersonajeMS.find( { id: parseInt(id) });
        res.render('mosaico', {
                titulo: 'Lista individual',
                listado: unBicho
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('*', function (req, res) {
  res.redirect('/personaje/mosaico');
});

module.exports = router;
