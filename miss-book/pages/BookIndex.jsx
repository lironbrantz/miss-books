import { bookService } from "../services/book-service.js"
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { showErrorMsg } from "../services/event-bus.service.js"


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
            .catch(err => {
                console.error('Cannot load books:', err)
                showErrorMsg('Cannot load books')
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg('Book removed successfully')
            })
            .catch(err => {
                console.error('Cannot remove book:', err)
                showErrorMsg('Cannot remove book')
            })
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