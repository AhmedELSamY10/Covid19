const express = require('express');
const Countries = require('../models/countries')
const User = require('../models/user')

const authenticationMiddleware = require('../middlewares/authentication');
const { find } = require('../models/countries');
const CountriesRounter = new express.Router();



CountriesRounter.get('/getCountries',async(req,res)=>{
    try{
        const countries = await Countries.find({});  // just to get all Countries for me to test
        res.send(countries)
    }
    catch(err){
        console.error(err);
        res.statusCode = 422;
        res.json({ success: false, message: err.message });
    }
})

CountriesRounter.use(authenticationMiddleware)   // this will make only the logged user to use the below functions

CountriesRounter.patch('/addFavCountries/:id' , async (req, res) => {
    try{
        
        const userById = await User.findById(req.signedData.id);
        const {id} = req.params;
        if(userById.Favs.includes(id)){
            res.send("this country already in favourits")
        }
        else{
            userById.Favs.push(id); 
            await userById.save();
            res.statusCode = 201;
            res.send(userById);
        }
        }
    catch(err){
        console.error(err);
        res.json({success: false, message: err.message});
    }
    })


    CountriesRounter.patch('/deleteFavCountries/:id' , async (req, res) => {
        try{
        
            const userById = await User.findById(req.signedData.id);
            const {id} = req.params;
            userById.Favs.pull(id);
            await userById.save();
            res.statusCode = 201;
            res.send(userById);
            }
        catch(err){
            console.error(err);
            res.json({success: false, message: err.message});
        }
        })


        CountriesRounter.get('/showFavCountries' , async (req, res) => {
            try{
                const userById = await User.findById(req.signedData.id);
                var favsById = []
                for(let i=0;i<userById.Favs.length;i++){
                 favsById.push(await Countries.findById(userById.Favs[i]))
                }
                res.statusCode = 201;
                res.send(favsById);
                }
            catch(err){
                console.error(err);
                res.json({success: false, message: err.message});
            }
            })

module.exports = CountriesRounter;