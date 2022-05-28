const express = require('express')
const app = express()
const cors = require('cors')  //app.use(cors()); arar jonn ata dite hoi
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT|| 5000;

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.abylu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//conections
async function run(){
    try{
        await client.connect();
        console.log('database connected successfully')
    }
    finally{
        //await client.close();

    }

}
 
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Traves')
});

app.listen(port, () =>{
     console.log(`Example app listening on port ${port}`)
})