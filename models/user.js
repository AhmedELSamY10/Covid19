const mongoose = require('mongoose');
require('./countries')



const UserSchema = new mongoose.Schema({


         username: {    type: String,
                        min: 3,
                        max: 30,
                        lowercase: true,
                        unique: true,
                        required: [true, "can't be blank"],
                        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
                        index: true
                    },

        password:{
            type: String,
            required: true
        },

        fname:{
            type: String,
            required: true
        },

        lname:{
            type: String,
            required: true
        },

        email: {    type: String,
                    lowercase: true,
                    unique: true,
                    required: [true, "can't be blank"], 
                    match: [/\S+@\S+\.\S+/, 'is invalid'], 
                    index: true
                },

        age:{
                    type: Number,
                    min: 12,
                    max: 120,
                    required: true
        },

        gender:{
            type: String,
            required: true,
            maxlength: 6,
            enum:["male","female"]
        },
        Favs:[{
            type:mongoose.Schema.Types.ObjectId,    
            ref:'Countries'
        }]


}
, {timestamps: true}
)

const User = mongoose.model('User', UserSchema);
module.exports = User;
