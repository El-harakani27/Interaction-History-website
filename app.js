const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const sleep = require('sleep-promise');
const app = express();
app.use(bodyParser.urlencoded({ extended:false}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views','views');
app.get('/', (req, res) => {
res.render('home')
})

app.post('/z', (req, res) => {
    
    const transcript = req.body.inp;

    const data = {'txt':transcript};
    v=JSON.stringify(data)
    
    /*
    const data = {'txt':'hello'};
    v=JSON.stringify(data)
    */
    request.post({url:'https://db7f-35-185-87-168.ngrok-free.app/',json:v},function(error, response,body){
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Error sending POST request');
        } else {
            
                console.log(body);
                
                res.render('audio',{text:body});
                    

        }

    })    
})

app.get('/success', (req, res) => {
    res.send('Transcript received successfully!');
});
app.listen(3000,()=>{
    console.log('listening on 3000')   
})