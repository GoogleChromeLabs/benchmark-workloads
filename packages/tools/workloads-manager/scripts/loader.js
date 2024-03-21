function showLoadingAnimation({
    text = "",
    chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
    delay = 100,
}) {
    let x = 0;

    return setInterval(function () {
        process.stdout.write("\r" + chars[x++] + " " + text);
        x = x % chars.length;
    }, delay);
}

module.exports = {
    showLoadingAnimation,
};
