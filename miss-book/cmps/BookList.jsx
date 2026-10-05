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
                            <button><Link to={`/book/${book.id}`}><i className="fa-solid fa-eye"></i> Details</Link></button>
                            <button><Link to={`/book/edit/${book.id}`}><i className="fa-solid fa-pen"></i> Edit</Link></button>
                        </section>
                    </li>
                ))}
            </ul>
        </section>
    )
}