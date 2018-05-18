export const sentences = [
    'Some sample text with nice, simple words',
    'that you have to type out really quickly to win if you want to be the very best, like no one ever was.',
    'To catch them all is your real quest, to train them is your cause...',
    'Yu gi oh!'
]

export function listenForInput(addCb, removeCb) {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (removeCb)
                removeCb()
        } else if (e.key.length === 1 && e.key.charCodeAt(0) >= 32 && e.key.charCodeAt(0) <= 126) {
            addCb(e.key)
        }
    })
}
