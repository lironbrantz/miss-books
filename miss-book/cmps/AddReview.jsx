import { bookService } from '../services/book-service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'
const { useState } = React

export function AddReview({ bookId, onReviewAdded }) {
    const [review, setReview] = useState({
        fullname: '',
        rating: 1,
        readAt: ''
    })
    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setReview(prevReview => ({
            ...prevReview,
            [prop]: value
        }))
    }
    function onAddReview(ev) {
        ev.preventDefault()

        bookService.addReview(bookId, review)
            .then((updatedBook) => {
               onReviewAdded(updatedBook)
                showSuccessMsg('Review added successfully')
            })
    }

    const { fullname, rating, readAt } = review

    return (
        <section className="add-review">
            <h2>Add a Review</h2>

            <form onSubmit={onAddReview}>
                <label htmlFor="fullname">Full Name:</label>
                <input type="text" id="fullname" name="fullname" value={fullname} onChange={handleChange} />

                <label htmlFor="rating">Rating:</label>
                <input type="number" id="rating" name="rating" min="1" max="5" value={rating} onChange={handleChange} />

                <label htmlFor="readAt">Read At:</label>
                <input type="date" id="readAt" name="readAt" value={readAt} onChange={handleChange} />

                <button>Add Review</button>
            </form>
        </section>
    )
}