import './IngredientList.css';

export function IngredientList({ ingredients, onDelete, onToggleConsumed, onUpdate }) {
    if (ingredients.length === 0) {
        return <div className="empty-state">まだ登録されていません。</div>;
    }

    // Calculate generic status (e.g. days until expiry)
    const getExpiryStatus = (dateString) => {
        if (!dateString) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiry = new Date(dateString);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { label: '期限切れ', className: 'status-expired' };
        if (diffDays <= 3) return { label: `あと${diffDays}日`, className: 'status-warning' };
        return { label: dateString, className: 'status-ok' };
    };

    return (
        <div className="ingredient-list">
            {ingredients.map(item => {
                const status = getExpiryStatus(item.expiryDate);
                return (
                    <div key={item.id} className={`ingredient-item ${item.isConsumed ? 'consumed' : ''}`}>
                        <div className="item-checkbox">
                            <input
                                type="checkbox"
                                checked={item.isConsumed}
                                onChange={() => onToggleConsumed(item.id)}
                            />
                        </div>
                        <div className="item-details">
                            <div className="item-header">
                                <span className="item-name">{item.name}</span>
                                <input
                                    type="text"
                                    className="item-quantity-input"
                                    value={item.quantity}
                                    onChange={(e) => onUpdate(item.id, { quantity: e.target.value })}
                                    onClick={(e) => e.stopPropagation()}
                                    placeholder="個数/量"
                                />
                            </div>
                            <div className="item-meta">
                                {status && (
                                    <span className={`expiry-badge ${status.className}`}>
                                        {status.label}
                                    </span>
                                )}
                                {item.notes && <span className="item-notes">{item.notes}</span>}
                            </div>
                        </div>
                        <button
                            className="delete-btn"
                            onClick={() => onDelete(item.id)}
                            aria-label="削除"
                        >
                            ×
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
