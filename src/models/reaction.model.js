const mongoose = require('mongoose');
const { Schema } = mongoose;

const type = ['vote', 'disvote']

const reactionSchema = new Schema({
    comment_id: { type: Schema.Types.ObjectId, default: '' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    type: { type: Schema.Types.ObjectId, enum: type, default: 'vote' },
}, { timestamps: { currentTime: () => Date.now() } });

const Reaction = mongoose.model('reactions', reactionSchema);

module.exports = Reaction;

