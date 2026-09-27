import { bookService } from '../services/book-service.js'

const { useState, useEffect } = React

export function BookDetails({ bookId }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBook(book))
    }
    function getReadingLevel() {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
        return ''
    }
    if (!book) return 'Loading...'
function getPublishedDate() {
    const currYear = new Date().getFullYear()

    if (book.publishedDate < currYear - 10) return 'Vintage'
    if (book.publishedDate === currYear) return 'New'

    return ''
}
function getPriceClass() {
    if (book.listPrice.amount > 150) return 'red'
    if (book.listPrice.amount < 20) return 'green'
    return ''
}
function isOnSale() {   
    return book.listPrice.isOnSale ? 'On Sale' : ''
}
    return (
        <section className="book-details">
            <h2>{book.title}</h2>
            <img src={book.thumbnail} alt={book.title} />
            <p>{book.subtitle}</p>
            <p>{book.authors.join(', ')}</p>
            <p>{book.publishedDate}</p>
            <p>{book.description}</p>
            <p>{book.pageCount}</p>
            <p>{book.categories.join(', ')}</p>
            <p>{book.language}</p>
            <p className={getPriceClass()}>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <p>{getReadingLevel()}</p>
            <p>{getPublishedDate()}</p>
            <p>{isOnSale()}</p>
        </section>
    )
}