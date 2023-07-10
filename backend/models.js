const mongoose = require("mongoose")
const applySchema = new mongoose.Schema(

    {

        name: {

            type: String,

            required: true

        },

        address: {

            type: String,

            required: true

        },

        amount: {

            type: Number,

            required: true

        },
        date: {

            type: String,

            required: true

        },




    },

    { timestamp: true }

)

module.exports = mongoose.model('users', applySchema)