import { RateBySelect } from './RateBySelect.jsx'
import { RateByTextBox } from './RateByTextBox.jsx'
import { RateByStars } from './RateByStars.jsx'

export function DynamicCmp({ rateBy, rating, onSelected }) {
    switch (rateBy) {
        case 'RateBySelect':
            return <RateBySelect val={rating} onSelected={onSelected} />

        case 'RateByTextBox':
            return <RateByTextBox val={rating} onSelected={onSelected} />

        case 'RateByStars':
            return <RateByStars val={rating} onSelected={onSelected} />
    }

}