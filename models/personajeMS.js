const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personajeSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('personajes', personajeSchema);