const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header main-layout">
            <h1>Miss Books</h1>

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book">Books</NavLink>
            </nav>
        </header>
    )
}