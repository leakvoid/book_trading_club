'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var transactionSchema = new Schema({
    book_id: ObjectId,
    buyer_id: [{ type: ObjectId, ref: 'User' }],
    seller_id: [{ type: ObjectId, ref: 'User' }],
    is_accepted: Boolean
});

module.exports = mongoose.model('Transaction', transactionSchema);

