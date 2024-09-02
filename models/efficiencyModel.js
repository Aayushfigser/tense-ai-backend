// models/efficiencyModel.js
const mongoose = require('mongoose');

const efficiencySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    date: {
      type: Date,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    data: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Efficiency = mongoose.model('Efficiency', efficiencySchema);

module.exports = Efficiency;
