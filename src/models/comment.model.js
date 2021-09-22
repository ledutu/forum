const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId, default: '' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    content: { type: String, default: '' },
    vote: [{ type: Schema.Types.ObjectId, ref: 'reactions' }],
    disvote: [{ type: Schema.Types.ObjectId, ref: 'reactions' }],
    reply: [this],
    is_block: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;

