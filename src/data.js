export const sentences =  [
    'Some sample text you have to type out really quickly to win if you want to be the very best, like no one ever was.',
    'To catch them all is your real quest, to train them is your cause',
    'Yu gi oh!'
]

export function isValidChar (char) {
    return char.length === 1 && char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126
}
