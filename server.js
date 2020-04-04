require('dotenv').config();

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: true,
    credentials: true
}));

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
let db = mongoose.connection;
db.on('error', () => {
    console.log('[-]Mongoose connected fail...')
});
db.once('open', () => {
    console.log('[+]Mongoose connected success...');
});

let indexRouter = require('./routes/index');
app.use('/', indexRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[+]Server is running on ${PORT} port`);
})