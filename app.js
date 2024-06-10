const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const app = express();
app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/z', (req, res) => {
    
    txt=req.body.txt;

    const data = {'txt':txt};
    v=JSON.stringify(data)
    /*
    const data = {'txt':'hello'};
    v=JSON.stringify(data)
    */
    request.post({url:'https://406f-34-83-129-0.ngrok-free.app/',json:v},function(error, response,body){
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Error sending POST request');
        } else {
            console.log(response)
            res.sendFile(path.join(__dirname,'last.html'))

        }

    })
    
})
app.listen(3000,()=>{
    console.log('listening on 3000')   
})