function circleArea(radius) {
    const area = Math.round(Math.PI * (radius * radius));
    console.log(`Dairenin alanı: ${area}`);
}

function circleCircumference(radius) {
    const circumference = Math.round(2 * Math.PI * radius);
    console.log(`Dairenin çevresi: ${circumference}`);
}

module.exports = {
    circleArea,
    circleCircumference
}