import { useState, useEffect } from 'react';

const STORAGE_KEY_RECIPES = 'cooking-app-recipes';

export function useRecipes() {
    const [recipes, setRecipes] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY_RECIPES);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_RECIPES, JSON.stringify(recipes));
    }, [recipes]);

    const addRecipe = (recipe) => {
        setRecipes(prev => [
            ...prev,
            { ...recipe, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
        ]);
    };

    const deleteRecipe = (id) => {
        setRecipes(prev => prev.filter(item => item.id !== id));
    };

    return {
        recipes,
        addRecipe,
        deleteRecipe
    };
}
