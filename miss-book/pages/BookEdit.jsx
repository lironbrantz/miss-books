import { bookService } from '../services/book-service.js'
import { eventBusService } from '../services/event-bus.service.js'


const { useState, useEffect } = React

const { useNavigate, useParams, Link } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
    }
    const navigate = useNavigate()



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
        if (prop === 'authors') {
            value = value.split(',').map(author => author.trim())
        }

        setBookToEdit(prevBook => ({
            ...prevBook,
            [prop]: value
        }))
    }

    function handleChangeListPrice({ target }) {
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

        setBookToEdit(prevBook => ({
            ...prevBook,
            listPrice: {
                ...prevBook.listPrice,
                [prop]: value
            }
        }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(savedBook => {
                if (!bookId) {
                    eventBusService.emit('show-user-msg', {
                        txt: 'Book added successfully'
                    })
                    navigate('/book')
                }
            })
    }

    const { title, authors, listPrice, description, pageCount } = bookToEdit
    const { amount, isOnSale } = listPrice

    return (
        <section className="book-edit">
            <h2>{bookId ? 'Edit Book' : 'Add Book'}</h2>
            <form onSubmit={onSaveBook}>

                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={handleChange} />
                <label htmlFor="pageCount">Page Count:</label>
                <input type="number" id="pageCount" name="pageCount" value={pageCount || ''} onChange={handleChange} />

                <label htmlFor="authors">Authors:</label>
                <input type="text" id="authors" name="authors" value={authors} onChange={handleChange} />

                <label htmlFor="price">List Price:</label>
                <input type="number" id="price" name="amount" value={listPrice.amount || ''} onChange={handleChangeListPrice} />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={description} onChange={handleChange}></textarea>

                <label htmlFor="isOnSale">On Sale:</label>
                <input type="checkbox" id="isOnSale" name="isOnSale" checked={isOnSale} onChange={handleChangeListPrice} />



                <button>Save</button>
            </form>
        </section>
    )
}