export const sentences = [
    'Some sample text with nice, simple words',
    'that you have to type out really quickly to win if you want to be the very best, like no one ever was.',
    'To catch them all is your real quest, to train them is your cause...',
    'Yu gi oh!'
]

export function listenForInput(addCb, removeCb) {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            e.preventDefault()
            e.stopPropagation()

            if (removeCb)
                removeCb()
        } else if (e.key.length === 1 && e.key.charCodeAt(0) >= 32 && e.key.charCodeAt(0) <= 126) {
            addCb(e.key)
        }
    })
}

export function getRange(stringList, globalIndex) {
    let position = 0
    for (let string of stringList) {
        position += string.length
        if (globalIndex < position) {
            return {
                from: position - string.length,
                to: position
            }
        }
    }
    return null
}
