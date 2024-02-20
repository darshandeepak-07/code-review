const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 8000;
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/', async (req, res) => {
    try {
        const code = req.body.code;
        const suggestions = await getCodeSuggestions(code);
        res.render("main",{code:`${code} ${suggestions}`})
    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        res.status(500).json({ error: 'Server Error' })
    }
});
app.get('/',(req,res)=>{
    res.render("main",{code: ""});
})
async function getCodeSuggestions(code) {
    
    const response = await axios.post('http://127.0.0.1:5000/suggest', { code });
    return response.data.suggestions;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
