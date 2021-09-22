const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    flag_id: { type: String, default: '' },
    title: { type: String, default: '' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }],
    views: { type: Number, default: 0 },
    is_block: { type: Boolean, default: false },
    is_hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const Post = mongoose.model('posts', postSchema);

module.exports = Post;

