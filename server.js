import express from 'express'
const app = express()

//middlwware
app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('chat');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});