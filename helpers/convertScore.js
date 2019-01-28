function scoreLetter(score) {
    if (!score) {
        return `Tidak ada score, empty`
    } else if (score > 85) {
        return 'A'
    } else if (score > 70) {
        return 'B'
    } else if (score > 55) {
        return 'C'
    } else if (score <= 55) {
        return 'E'
    }
}

module.exports = scoreLetter