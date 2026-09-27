export function BookPreview({ book }) {
    return (
        <section className="book-preview">
            <h3>{book.title}</h3>
            <p>{book.listPrice}</p>
        </section>
    )
}