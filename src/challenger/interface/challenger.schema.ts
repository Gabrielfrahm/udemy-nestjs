import * as mongoose from 'mongoose';

export const ChallengerSchema = new mongoose.Schema(
  {
    challengerTime: { type: Date },
    status: { type: String },
    solicitationTime: { type: Date },
    answerTime: { type: Date },
    category: { type: String },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    Match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
    },
  },
  { timestamps: true, collection: 'challenger' },
);
