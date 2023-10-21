const express = require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 3000
app.use(cors());
app.use(express.json());

// mdrashadul898
// YBOKnLT93ldMcj8j

const uri = "mongodb+srv://mdrashadul898:YBOKnLT93ldMcj8j@cluster0.jds5c8p.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    const userCollection=client.db("userDbB").collection("newusers");

    // user create
    app.post("/productdetails",async(req,res)=>{
      const user=req.body;
      const result=await userCollection .insertOne(user);   
      res.send(result);
    })

    // user read
    app.get("/productdetails",async(req,res)=>{
      const result=await userCollection.find().toArray();
      res.send(result);
      console.log(result);
    })

    // User Update
    app.get("/productdetails/:id", async(req,res)=>{
        const id=req.params.id;
        const query={_id: new ObjectId(id)}
        const result=await userCollection.findOne(query);
        res.send(result);
    })

    // Update user
    app.put('/update/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) }
        const options = { upsert: true };
        const updateproduct = req.body;

        const product = {
            $set: {
                image: updateproduct.image,
                name: updateproduct.name,
                brand: updateproduct.brand,
                types: updateproduct.types,
                price: updateproduct.price,
                reating: updateproduct.reating,
                description: updateproduct.description
            }
        }

        const result = await userCollection.updateOne(filter, product, options);
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})