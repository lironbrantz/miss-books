import { RateBySelect } from './RateBySelect.jsx'
import { RateByTextBox } from './RateByTextBox.jsx'
import { RateByStars } from './RateByStars.jsx'
const { useState } = React

export function Full() {
    const [rateBy, setRateBy] = useState('RateBySelect')
    const [rating, setRating] = useState(1)

    return (
        <section className="reviews">


            <h1>this is review headline</h1>
            <p>this is the p txt </p>

            <label>
                <input type="radio" name="rateBy" value="RateBySelect" checked={rateBy === 'RateBySelect'} onChange={ev => setRateBy(ev.target.value)} />
                Select
            </label>
               <label>
                <input type="radio" name="rateBy" value="RateByTextBox" checked={rateBy === 'RateByTextBox'} onChange={ev => setRateBy(ev.target.value)} />
                Text
            </label>
                <label>
                <input type="radio" name="rateBy" value="RateByStars" checked={rateBy === 'RateByStars'} onChange={ev => setRateBy(ev.target.value)} />
                Stars
            </label>



            <DynamicCmp rateBy={rateBy} rating={rating} onSelected={setRating} />
        </section>
    )
}


