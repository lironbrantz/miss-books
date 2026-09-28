
const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {


    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    function onHandleChange(ev) {
        let { name: field, value, type } = ev.target

        if (type === 'number') value = +value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }
    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitForm(ev) {
        ev.preventDefault()
    }

    return (
        <section className="book-filter">
            <h2>Filter Books</h2>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="title">Title: </label>
                <input value={filterByToEdit.title} onChange={onHandleChange} type="text" id="title" name="title" />

                <label htmlFor="author">Author: </label>
                <input value={filterByToEdit.author} onChange={onHandleChange} type="text" id="author" name="author" />

                <label htmlFor="language">Language: </label>
                <input value={filterByToEdit.language} onChange={onHandleChange} type="text" id="language" name="language" />

                <label htmlFor="price">Max Price: </label>
                <input value={filterByToEdit.price} onChange={onHandleChange} type="number" id="price" name="price" />
                <button>Submit</button>
            </form>
        </section>
    )
}