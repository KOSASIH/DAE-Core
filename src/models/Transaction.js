import mongoose from 'mongoose';

/**
 * Transaction Schema for storing transaction records.
 */
const transactionSchema = new mongoose.Schema({
    transactionHash: {
        type: String,
        required: true,
        unique: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
