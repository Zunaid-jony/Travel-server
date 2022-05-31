const express = require('express')
const app = express()
const cors = require('cors')  //app.use(cors()); arar jonn ata dite hoi
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const res = require('express/lib/response');

const fileUpload = require('express-fileupload')// ata file upload er jonn use kara hoi

const port = process.env.PORT|| 5000;

app.use(cors());
app.use(express.json()); // user thake j data asbe se gola r jonn ta dite hoi
app.use(fileUpload()) //ata file uploade karar jonn

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.abylu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//conections
async function run(){
    try{
        await client.connect();
        console.log('database connected successfully')
        // ami ki file name rakbo! ata jonn no-1
        const database = client.db('trave_service');

        const addService = database.collection('addSarvices')
        const serviceColection =database.collection('services')
        //app.put('/users/:id') kno user k update kara 
        // app.post mane hocche clint site thkae kiso post karbe
        //**************************************************** */
        app.post('/services', async (req, res) =>{
            const service =req.body;
            const result = await serviceColection.insertOne(service)
            console.log(result);
            res.json({result})

        })


        //mongodb thake phathabo clint er kase
        app.get('/services', async(req, res)=>{
            const cursor = serviceColection.find({});
            const serviceUser = await cursor.toArray();
            res.json(serviceUser);
        })


       // add services gola 
       app.post('/addServices',async(req, res)=>{
           const name =req.body.name;
           const price = req.body.price;
           const discription = req.body.discription;
           const pic = req.files.image;
           const picData = pic.data;
           const encodedPic = picData.toString('base64');
           const imageBuffer = Buffer.from(encodedPic,'base64');
           const add = {
               name,
               price,
               discription,
               image:imageBuffer
           }
           const result = await addService.insertOne(add);
           console.log('files',req.files)
           res.json(result)

       })

       app.get('/addServices', async(req, res) =>{
           const cursor = addService.find({})
           const addSe =await cursor.toArray();
           res.json(addSe);
       })

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