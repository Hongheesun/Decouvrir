import mongoose, { Schema } from "mongoose";
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const CategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
})
ProductSchema.plugin(autoIncrement.plugin, {
    model: 'CategorySchemaModel',
    field: 'seq',
    startAt: 1,
    increment: 1
})

export { CategorySchema };