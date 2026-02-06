import './RecommendationView.css';

const TEMPLATE_RECIPES = [
    { title: "カレーライス", ingredients: ["人参", "玉ねぎ", "じゃがいも", "肉"], matchCount: 0 },
    { title: "肉じゃが", ingredients: ["じゃがいも", "肉", "玉ねぎ"], matchCount: 0 },
    { title: "オムライス", ingredients: ["卵", "玉ねぎ", "米", "鶏肉"], matchCount: 0 },
    { title: "チャーハン", ingredients: ["米", "卵", "ネギ", "肉"], matchCount: 0 },
    { title: "野菜炒め", ingredients: ["キャベツ", "人参", "ピーマン", "肉"], matchCount: 0 },
];

export function RecommendationView({ ingredients }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Expiry Alerts
    const expiringItems = ingredients.filter(item => {
        if (item.isConsumed || !item.expiryDate) return false;
        const expiry = new Date(item.expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
    }).sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

    // 2. Recipe Suggestions (Mock AI)
    const availableNames = ingredients
        .filter(i => !i.isConsumed)
        .map(i => i.name.toLowerCase());

    const suggestions = TEMPLATE_RECIPES.map(recipe => {
        const matches = recipe.ingredients.filter(ing =>
            availableNames.some(name => name.includes(ing) || ing.includes(name))
        );
        return { ...recipe, matchCount: matches.length, matchedIngredients: matches };
    })
        .filter(r => r.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount);

    return (
        <div className="recommendation-view">

            {/* Notifications Section */}
            <section className="notification-section">
                <h3>🔔 お知らせ / 通知</h3>
                {expiringItems.length > 0 ? (
                    <div className="alert-list">
                        {expiringItems.map(item => {
                            const expiry = new Date(item.expiryDate);
                            const diffTime = expiry - today;
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            const isExpired = diffDays < 0;
                            return (
                                <div key={item.id} className={`alert-card ${isExpired ? 'expired' : 'warning'}`}>
                                    <span className="alert-icon">{isExpired ? '⚠️' : '⏰'}</span>
                                    <div className="alert-content">
                                        <strong>{item.name}</strong>
                                        {isExpired ? 'の期限が切れています！' : `の期限が残り ${diffDays}日 です`}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="no-alerts">現在、期限切れ間近の食材はありません。</p>
                )}
            </section>

            {/* Recommendations Section */}
            <section className="suggestion-section">
                <h3>🍽️ 今日の献立提案 (AI Mock)</h3>
                <p className="suggestion-desc">冷蔵庫の食材から作れるレシピを提案します</p>

                {suggestions.length > 0 ? (
                    <div className="suggestion-list">
                        {suggestions.map((recipe, index) => (
                            <div key={index} className="suggestion-card">
                                <div className="suggestion-header">
                                    <h4>{recipe.title}</h4>
                                    <span className="match-tag">{recipe.matchCount}つの食材が一致</span>
                                </div>
                                <div className="suggestion-ingredients">
                                    使用する食材: {recipe.matchedIngredients.join(', ')} ...
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-suggestions">
                        <p>現在の食材から提案できるレシピが見つかりませんでした。</p>
                        <p>もう少し食材を追加してみましょう！</p>
                    </div>
                )}
            </section>
        </div>
    );
}
