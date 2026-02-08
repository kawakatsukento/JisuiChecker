import { useState } from 'react';
import './AddIngredientForm.css';

export function AddIngredientForm({ onAdd }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [category, setCategory] = useState('ingredient');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;

        onAdd({
            name,
            quantity,
            expiryDate,
            category,
            notes
        });

        // Reset form
        setName('');
        setQuantity('');
        setExpiryDate('');
        setCategory('ingredient');
        setNotes('');
    };

    return (
        <form className="add-ingredient-form" onSubmit={handleSubmit}>
            <h3>食材を追加</h3>
            <div className="form-group">
                <label htmlFor="name">食品名</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例: 人参"
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="quantity">個数/量</label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="例: 3本"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="expiry">賞味期限</label>
                    <input
                        type="date"
                        id="expiry"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>カテゴリ</label>
                <div className="category-select">
                    <label className={`category-option ${category === 'ingredient' ? 'active' : ''}`}>
                        <input
                            type="radio"
                            name="category"
                            value="ingredient"
                            checked={category === 'ingredient'}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        食材
                    </label>
                    <label className={`category-option ${category === 'seasoning' ? 'active' : ''}`}>
                        <input
                            type="radio"
                            name="category"
                            value="seasoning"
                            checked={category === 'seasoning'}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        調味料
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="notes">備考</label>
                <input
                    type="text"
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="メモ..."
                />
            </div>

            <button type="submit" className="submit-btn">追加する</button>
        </form>
    );
}
