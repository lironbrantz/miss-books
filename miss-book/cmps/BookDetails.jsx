import { bookService } from '../services/book-service.js'
import { LongTxt } from './LongTxt.jsx'
import { AddReview } from './AddReview.jsx'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(book => setBook(book))
    }
    function onRemoveReview(reviewIdx) {
        bookService.removeReview(book.id, reviewIdx)
            .then(() => {
                showSuccessMsg('Review removed successfully')
                loadBook()
            })
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
            <Link to="/book" className="back-btn">← Back to Books</Link>

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

                    <p className={`book-price ${getPriceClass()}`}>{book.listPrice.amount} {book.listPrice.currencyCode}</p>

                    <LongTxt txt={book.description} />

                    <div className="book-meta">
                        <p><strong>Pages:</strong> {book.pageCount}</p>
                        <p><strong>Categories:</strong> {book.categories.join(', ')}</p>
                        <p><strong>Language:</strong> {book.language}</p>
                    </div>
                </div>
            </div>

            <div className="book-navigation">
                <Link to={`/book/${book.prevBookId}`}>Previous Book</Link>
                <Link to={`/book/${book.nextBookId}`}>Next Book</Link>
            </div>

            <AddReview bookId={book.id} onReviewAdded={setBook} />
            <ul>
                <h2>Reviews</h2>
                {book.reviews && book.reviews.map((review, idx) => (
                    <li key={idx}>
                        <p>name: {review.fullname}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Read at: {review.readAt}</p>
                        <button onClick={() => onRemoveReview(idx)}>Remove</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}