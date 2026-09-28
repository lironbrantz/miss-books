const {useState} = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <section className="long-txt">
            <p>
                {isExpanded ? txt : txt.slice(0, length)}
            </p>

            <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
        </section>
    )
}