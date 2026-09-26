import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
const { useState } = React

export function App() {
    const [page, setPage] = useState('home')
    return (
        <section className="app">
      <AppHeader onSetPage={setPage} />

      <main className="app">

        {page === 'home' && <HomePage />}
        {page === 'about' && <AboutUs />}
        {page === 'books' && <BookIndex />}
      </main>
        </section>
    )
}