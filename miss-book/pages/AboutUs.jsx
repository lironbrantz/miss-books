
const { Link, Outlet } = ReactRouterDOM

export function AboutUs() {

    return (
        <section className="about-us">
            <h2>About Us</h2>
            <p>This is the About page.</p>
            <nav>
                <Link to="team">Our Team</Link> |
                <Link to="goal">Our Goal</Link>
            </nav>
            <Outlet />
        </section>
    )
}

