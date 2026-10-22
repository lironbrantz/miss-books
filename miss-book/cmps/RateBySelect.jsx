export function RateBySelect({ val, onSelected }) {

    return (
         <select value={val} onChange={ev => onSelected(+ev.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
    )
}