const { Schema } = require('mongoose')

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    ingredients: { type: Array, required: true },
    instructions: { type: String, required: true },
    photo: { type: String, required: false },
    url: { type: String, required: false }
  },
  { timestamps: true }
)

module.exports = recipeSchema
