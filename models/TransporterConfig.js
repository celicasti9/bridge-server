const { model, Schema } = require("mongoose");

const transporterConfigSchema =  new Schema({

    host: {
        type: String,
        default: 'mail.codeitsolutionspr.com'
    },
    port: {
        type: Number,
        default: 465
    },
    user: {
        type: String,
        default: 'support@codeitsolutionspr.com'
    },
    pass: {
        type: String,
        default: 'UBqB9wF1!'
    }
})


module.exports = model("TransporterConfig", transporterConfigSchema);

