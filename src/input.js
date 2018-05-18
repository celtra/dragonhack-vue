export default function (addCb, removeCb) {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (removeCb)
                removeCb()
        } else if (e.key.length === 1 && e.key.charCodeAt(0) >= 32 && e.key.charCodeAt(0) <= 126) {
            addCb(e.key)
        }
    })
}
