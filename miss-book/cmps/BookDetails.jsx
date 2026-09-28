import { bookService } from '../services/book-service.js'
import { LongTxt } from './LongTxt.jsx'

const { useState, useEffect } = React

export function BookDetails({ bookId, onSetSelectedBookId }) {
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
        <button
            className="back-btn"
            onClick={() => onSetSelectedBookId(null)}
        >
            ← Back to Books
        </button>

        <div className="details-main">
            <img src={book.thumbnail} alt={book.title} />

            <div className="details-info">
                <h2>{book.title}</h2>
                <p className="subtitle">{book.subtitle}</p>

                <p><strong>Author:</strong> {book.authors.join(', ')}</p>
                <p><strong>Published:</strong> {book.publishedDate}</p>

                <div className="book-tags">
                    {getReadingLevel() && <span>{getReadingLevel()}</span>}
                    {getPublishedDate() && <span>{getPublishedDate()}</span>}
                    {book.listPrice.isOnSale && <span className="sale-tag">On Sale</span>}
                </div>

                <p className={`book-price ${getPriceClass()}`}>
                    {book.listPrice.amount} {book.listPrice.currencyCode}
                </p>

                <LongTxt txt={book.description} />

                <div className="book-meta">
                    <p><strong>Pages:</strong> {book.pageCount}</p>
                    <p><strong>Categories:</strong> {book.categories.join(', ')}</p>
                    <p><strong>Language:</strong> {book.language}</p>
                </div>
            </div>
        </div>
    </section>
)
}