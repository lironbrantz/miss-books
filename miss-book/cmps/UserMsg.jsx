import { eventBusService } from '../services/event-bus.service.js'

const { useState, useEffect } = React

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
             setTimeout(closeMsg, 2000)
        })

    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return null
    return (
     <section className={`user-msg ${msg.type}`}>
            {msg && <p>{msg.txt}</p>}
        <button onClick={closeMsg} className="close-btn"><i className="fa-solid fa-xmark"></i></button>
        </section>
    )
}