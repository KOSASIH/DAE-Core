import mongoose from 'mongoose';

/**
 * Proposal Schema for storing governance proposals.
 */
const proposalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    voteCount: {
        type: Number,
        default: 0,
    },
    proposer: {
        type: String,
        required: true,
    },
    executed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Proposal model
const Proposal = mongoose.model('Proposal', proposalSchema);

export default Proposal;
