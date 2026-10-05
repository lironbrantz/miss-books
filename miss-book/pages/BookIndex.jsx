import { bookService } from "../services/book-service.js"
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { eventBusService } from '../services/event-bus.service.js'

const { Link } = ReactRouterDOM

const { useState, useEffect } = React
export function BookIndex() {

    const [books, setBooks] = useState(null)

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }
    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() =>
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            )
            eventBusService.emit('show-user-msg', { txt: 'Book removed successfully' })
    }



    if (!books) return 'Loading...'
    return (
        <section className="book-index">
            <h1>Books Index</h1>
            <React.Fragment>
                <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
              <Link className="add-book-btn" to="/book/edit">Add Book</Link>
                <BookList books={books} onRemoveBook={onRemoveBook} />
            </React.Fragment>
        </section>
    )
}