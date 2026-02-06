import { useState } from 'react'
import './App.css'
import { useIngredients } from './hooks/useIngredients'
import { useRecipes } from './hooks/useRecipes'
import { AddIngredientForm } from './components/AddIngredientForm'
import { IngredientList } from './components/IngredientList'
import { AddRecipeForm } from './components/AddRecipeForm'
import { RecipeList } from './components/RecipeList'
import { RecommendationView } from './components/RecommendationView'

function App() {
  const { ingredients, addIngredient, deleteIngredient, toggleConsumed } = useIngredients();
  const { recipes, addRecipe, deleteRecipe } = useRecipes();
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'recipes', 'ideas'
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Kitchen</h1>
      </header>

      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          買い物リスト
        </button>
        <button
          className={`tab-btn ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          レシピ
        </button>
        <button
          className={`tab-btn ${activeTab === 'ideas' ? 'active' : ''}`}
          onClick={() => setActiveTab('ideas')}
        >
          提案・通知
        </button>
      </div>

      <main className="app-content">
        {activeTab === 'list' && (
          <>
            <section>
              <AddIngredientForm onAdd={addIngredient} />
            </section>
            <section>
              <h2>食材リスト ({ingredients.filter(i => !i.isConsumed).length})</h2>
              <IngredientList
                ingredients={ingredients}
                onDelete={deleteIngredient}
                onToggleConsumed={toggleConsumed}
              />
            </section>
          </>
        )}

        {activeTab === 'recipes' && (
          <>
            <section className="recipe-actions">
              {!isAddingRecipe ? (
                <button className="add-recipe-toggle" onClick={() => setIsAddingRecipe(true)}>
                  + 新しいレシピを追加
                </button>
              ) : (
                <AddRecipeForm
                  ingredients={ingredients}
                  onAdd={addRecipe}
                  onCancel={() => setIsAddingRecipe(false)}
                />
              )}
            </section>
            <section>
              <h2>レシピ一覧 ({recipes.length})</h2>
              <RecipeList
                recipes={recipes}
                ingredients={ingredients}
                onDelete={deleteRecipe}
              />
            </section>
          </>
        )}

        {activeTab === 'ideas' && (
          <RecommendationView ingredients={ingredients} />
        )}
      </main>
    </div>
  )
}

export default App
