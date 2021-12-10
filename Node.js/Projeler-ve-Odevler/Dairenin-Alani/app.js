const args = process.argv.slice(2);

const radius = Number(args[0]);
const area = Math.PI * (radius * radius);

console.log(`Yarıçapı ${radius} olan dairenin alanı: ${area}`);