import * as mongoose from 'mongoose';

export const matchSchema = new mongoose.Schema(
  {
    category: { type: String },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    def: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    result: [{ set: { type: String } }],
  },
  { timestamps: true, collection: 'match' },
);
