const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },   // ← add unique: true
    name: { type: String, required: true },
    tagline: String,
    shortNote: String,
    imageUrl: String,
    focusAreas: [String],
    eligibility: String,
    support: String,
    howItHelps: String,
    learnMoreUrl: String
  },
  {
    collection: 'schemes'
  }
);

module.exports = mongoose.model('Scheme', schemeSchema);
