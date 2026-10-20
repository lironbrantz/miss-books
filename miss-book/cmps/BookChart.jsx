const { useEffect } = React

export function BookChart({ data }) {

    useEffect(() => {
        if (!data.length) return

        const chart = new window.Chart(
            document.getElementById('books-chart'),
            {
                type: 'bar',
                data: {
                    labels: data.map(item => item.title),
                    datasets: [{
                        label: 'Books (%)',
                        data: data.map(item => item.value)
                    }]
                }
            }
        )

        return () => chart.destroy()
    }, [data])

    return <canvas id="books-chart"></canvas>
}