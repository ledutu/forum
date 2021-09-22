const mongoose = require('mongoose');
const { Schema } = mongoose;

const color = ['blue', 'green', 'yell', 'orange'];

const categorySchema = new Schema({
    name: { type: String, default: '' },
    short_name: { type: String, default: '' },
    visited: { type: Number, default: 0 },
    tag_color: { type: String, enum: color, default: 'orange' },
    is_hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;

