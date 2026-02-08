import { useState } from 'react';
import './CalendarView.css';

export function CalendarView({ ingredients }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
        setSelectedDate(null);
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
        setSelectedDate(null);
    };

    const getIngredientsForDate = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return ingredients.filter(item => item.expiryDate === dateStr && !item.isConsumed);
    };

    // Generate calendar grid
    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const expiringItems = getIngredientsForDate(day);
        const hasExpiry = expiringItems.length > 0;
        const isSelected = selectedDate === day;

        days.push(
            <div
                key={day}
                className={`calendar-day ${hasExpiry ? 'has-expiry' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedDate(day)}
            >
                <span className="day-number">{day}</span>
                {hasExpiry && <div className="expiry-dot"></div>}
            </div>
        );
    }

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <button onClick={prevMonth}>&lt;</button>
                <h2>{year}年 {month + 1}月</h2>
                <button onClick={nextMonth}>&gt;</button>
            </div>

            <div className="calendar-grid">
                <div className="weekday">日</div>
                <div className="weekday">月</div>
                <div className="weekday">火</div>
                <div className="weekday">水</div>
                <div className="weekday">木</div>
                <div className="weekday">金</div>
                <div className="weekday">土</div>
                {days}
            </div>

            {selectedDate && (
                <div className="selected-date-details">
                    <h3>{month + 1}月{selectedDate}日の期限切れ予定</h3>
                    {getIngredientsForDate(selectedDate).length > 0 ? (
                        <ul className="expiry-list">
                            {getIngredientsForDate(selectedDate).map(item => (
                                <li key={item.id} className="expiry-item">
                                    <span className="expiry-name">{item.name}</span>
                                    <span className="expiry-quantity">{item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-expiry">この日が期限の食材はありません。</p>
                    )}
                </div>
            )}
        </div>
    );
}
