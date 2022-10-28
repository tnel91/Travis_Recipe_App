import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const RecipeDetails = (props) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipeDetails, setRecipeDetails] = useState({
    name: '',
    description: '',
    yield: '',
    totalTime: '',
    ingredients: [],
    instructions: [],
    image: '',
    url: ''
  })

  let { recipeId } = useParams()
  let navigate = useNavigate()

  const setRecipe = async () => {
    const response = await axios
      .get(`http://localhost:3001/api/recipes/${recipeId}`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log(error)
      })
    setSelectedRecipe(response)
    setRecipeDetails({
      name: response.name.toUpperCase(),
      description: response.description,
      yield: response.yield,
      totalTime: response.totalTime,
      ingredients: response.ingredients.split('\n'),
      instructions: response.instructions.split('\n'),
      image: response.image,
      url: response.url
    })
  }

  const deleteRecipe = async () => {
    let confirm = window.confirm('Delete recipe forever?')
    if (confirm === true) {
      await axios
        .delete(`http://localhost:3001/api/recipes/${recipeId}`)
        .then(() => {
          navigate(`/recipes`)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    setRecipe()
  }, [recipeId])

  return (
    <div>
      <h2>Recipe Details</h2>
      <button onClick={() => props.showUpdateForm(recipeId)}>
        Edit Recipe
      </button>
      <button onClick={() => deleteRecipe()}>Delete Recipe</button>
      <h1>{recipeDetails.name}</h1>
      <img src={recipeDetails.image} alt="Recipe Image" />
      <ul className="recipe-ingredients">
        {recipeDetails.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <br />
      <ol className="recipe-instructions">
        {recipeDetails.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  )
}

export default RecipeDetails
