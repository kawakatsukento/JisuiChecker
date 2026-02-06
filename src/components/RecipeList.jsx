import './RecipeList.css';

export function RecipeList({ recipes, ingredients, onDelete }) {
    if (recipes.length === 0) {
        return <div className="empty-state">レシピがまだありません。</div>;
    }

    const getIngredientNames = (ids) => {
        return ids
            .map(id => ingredients.find(i => i.id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                    <div className="recipe-header">
                        <h3>{recipe.title}</h3>
                        <button
                            className="delete-recipe-btn"
                            onClick={() => onDelete(recipe.id)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="recipe-ingredients">
                        <strong>材料:</strong> {getIngredientNames(recipe.ingredientIds)}
                    </div>

                    {recipe.instructions && (
                        <div className="recipe-instructions">
                            {recipe.instructions}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
