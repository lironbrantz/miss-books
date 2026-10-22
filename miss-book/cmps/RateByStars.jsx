export function RateByStars({ val, onSelected }) {
    return (
        <div>
            {[1, 2, 3, 4, 5].map(num => (
                <button type="button" key={num} onClick={() => onSelected(num)}>
                    {num <= val ? '★' : '☆'}
                </button>
            ))}
        </div>
    )
}