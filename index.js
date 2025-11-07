const express = require('express');
const cors=require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 3000

app.use(cors(
 ))
 app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is runnning fine!')
})


  app.get('/hello',(req, res)=>{
    res.send('HOW Are you!');

  })



const uri = "mongodb+srv://modal-db:EGkaoWQfwP3sH7fR@cluster0.cyspe14.mongodb.net/?appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    await client.connect();
    const db=client.db('modal-db')
    const modalCollection=db.collection('modals')

    app.get('/modals',async(req,res)=>{

      const result= await modalCollection.find().toArray()

      //console.log(result)
      res.send(result);


    })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Server  is listening on port ${port}`)
})
