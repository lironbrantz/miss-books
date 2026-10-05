import { bookService } from '../services/book-service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect, useRef } = React

export function BookAdd() {
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState([])
    const timeoutId = useRef()

    useEffect(() => {
        if (!search) return setBooks([])

        timeoutId.current = setTimeout(() => {
            bookService.getGoogleBooks(search).then(setBooks)
        }, 500)

        return () => clearTimeout(timeoutId.current)
    }, [search])

    function onSearch(ev) {
        ev.preventDefault()
        clearTimeout(timeoutId.current)
        bookService.getGoogleBooks(search).then(setBooks)
    }

    function onAddBook(book) {
        bookService.addGoogleBook(book)
            .then(savedBook => {
                if (savedBook) showSuccessMsg('Book added successfully')
            })
    }

    return (
        <section className="book-add">
            <form onSubmit={onSearch}>
                <input value={search} onChange={ev => setSearch(ev.target.value)} placeholder="Search book" />
                <button type="submit">Search</button>
            </form>

            <ul>
                {books.map(book =>
                    <li key={book.id}>
                        {book.title}
                        <button type="button" onClick={() => onAddBook(book)}>Add</button>
                    </li>
                )}
            </ul>
        </section>
    )
}