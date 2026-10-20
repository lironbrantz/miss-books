import { bookService } from "../services/book-service.js"
import { BookChart } from "../cmps/BookChart.jsx"
const { useState, useEffect } = React


export function Dashboard() {
    const [categoryStats, setCategoryStats] = useState([])

    useEffect(() => {
        bookService.getCategoryStats()
            .then(setCategoryStats)
    }, [])

    return (
        <section className="dashboard">
            <h1>Books Dashboard</h1>
            <BookChart data={categoryStats} />
        </section>
    )
}
