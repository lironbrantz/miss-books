import { BookPreview } from './BookPreview.jsx'

const { Link } = ReactRouterDOM


export function BookList({ books, onRemoveBook }) {
    return (
        <section>
            <h2>Book List:</h2>
            <ul className="book-list">
                {books.map(book => (
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section>
                            <button onClick={() => onRemoveBook(book.id)}><i className="fa-solid fa-trash"></i> Remove</button>
                            <Link to={`/book/${book.id}`} className="book-action"><i className="fa-solid fa-eye"></i> Details</Link>
                            <Link to={`/book/edit/${book.id}`} className="book-action"><i className="fa-solid fa-pen"></i> Edit</Link>
                        </section>
                    </li>
                ))}
            </ul>
        </section>
    )
}