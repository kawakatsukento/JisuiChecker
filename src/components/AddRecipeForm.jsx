import { useState } from 'react';
import './AddRecipeForm.css';

export function AddRecipeForm({ ingredients, onAdd, onCancel }) {
    const [title, setTitle] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [instructions, setInstructions] = useState('');

    const toggleIngredient = (id) => {
        setSelectedIngredients(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;

        onAdd({
            title,
            ingredientIds: selectedIngredients,
            instructions
        });
        onCancel();
    };

    return (
        <form className="add-recipe-form" onSubmit={handleSubmit}>
            <h3>レシピを作成</h3>

            <div className="form-group">
                <label htmlFor="title">料理名</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="例: カレーライス"
                    required
                />
            </div>

            <div className="form-group">
                <label>使用する食材</label>
                <div className="ingredient-selector">
                    {ingredients.map(item => (
                        <label key={item.id} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={selectedIngredients.includes(item.id)}
                                onChange={() => toggleIngredient(item.id)}
                            />
                            {item.name}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="instructions">作り方/メモ</label>
                <textarea
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={4}
                />
            </div>

            <div className="form-actions">
                <button type="button" onClick={onCancel} className="cancel-btn">キャンセル</button>
                <button type="submit" className="submit-btn">保存</button>
            </div>
        </form>
    );
}
