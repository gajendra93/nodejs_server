let express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');

let config = require('./config.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/AppRoutes')());

app.use((error: any, req: any, res: any, next: any) => {
    if (error instanceof SyntaxError && 'body' in error) {
        res.status(400).json({ error: { message: 'Invalid request' } });
    }
    else next();
})

app.listen(config.PORT, (error: any) => {
    if (!error) {
        console.info("Service listening on PORT %s...", config.PORT);
    }
    else {
        console.info("Initialization failed with error: %s", JSON.stringify(error));
    }
})