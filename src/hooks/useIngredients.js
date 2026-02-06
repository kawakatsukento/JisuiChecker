import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cooking-app-ingredients';

export function useIngredients() {
    const [ingredients, setIngredients] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ingredients));
    }, [ingredients]);

    const addIngredient = (ingredient) => {
        setIngredients(prev => [
            ...prev,
            { ...ingredient, id: crypto.randomUUID(), isConsumed: false, createdAt: new Date().toISOString() }
        ]);
    };

    const updateIngredient = (id, updates) => {
        setIngredients(prev => prev.map(item =>
            item.id === id ? { ...item, ...updates } : item
        ));
    };

    const deleteIngredient = (id) => {
        setIngredients(prev => prev.filter(item => item.id !== id));
    };

    const toggleConsumed = (id) => {
        setIngredients(prev => prev.map(item =>
            item.id === id ? { ...item, isConsumed: !item.isConsumed } : item
        ));
    };

    return {
        ingredients,
        addIngredient,
        updateIngredient,
        deleteIngredient,
        toggleConsumed
    };
}
