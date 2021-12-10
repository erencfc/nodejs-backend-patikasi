const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
    ctx.response.status = 200;
    ctx.set('Content-Type', 'text/html');
    switch (ctx.url) {
        case '/':
            ctx.body = '<h1>INDEX SAYFASINA HOS GELDINIZ</h1>'
            break;

        case '/hakkimda':
            ctx.body = '<h1>HAKKIMDA SAYFASINA HOS GELDINIZ</h1>'
            break;

        case '/iletisim':
            ctx.body = '<h1>ILETISIM SAYFASINA HOS GELDINIZ</h1>'
            break;

        default:
            ctx.response.status = 404;
            ctx.body = '<h1>404 SAYFA BULUNAMADI</h1>'
            break;
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu port ${PORT} de başlatıldı.`);
});