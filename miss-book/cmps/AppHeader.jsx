export function AppHeader({ onSetPage }) {
    return (
        <header className="app-header main-layout">
            <h1>Miss Books</h1>

            <nav>
                <button onClick={() => onSetPage('home')}>Home</button>
                <button onClick={() => onSetPage('about')}>About</button>
                <button onClick={() => onSetPage('books')}>Books</button>
            </nav>
        </header>
    )
}