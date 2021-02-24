const mongoose = require('mongoose');


const CountriesSchema = new mongoose.Schema({


})

const Countries = mongoose.model('Countries',  CountriesSchema );
module.exports = Countries;
