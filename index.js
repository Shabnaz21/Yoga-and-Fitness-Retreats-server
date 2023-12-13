const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleWare 
app.use(cors(
    {
        origin: [
        "https://yoga-and-fitness-retreat-e3434.web.app"
            // 'http://localhost:5173'
        ],
        credentials: true
    }
));
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0s8hpk2.mongodb.net/SharePlate?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Connection Collection
const serviceCollection = client.db('YogaDB').collection('services')
const packageCollection = client.db('YogaDB').collection('packages')
const offerCollection = client.db('YogaDB').collection('offers')


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // Service Post
        app.post('/services', async (req, res) => {
            const services = req.body;
            const result = await serviceCollection.insertOne(services);
            res.send(result);
        })
        app.get("/services", async (req, res) => {
            const result = await serviceCollection.find().toArray();
            res.send(result);
        });

        // Package Post
        app.post('/packages', async (req, res) => {
            const packages = req.body;
            const result = await packageCollection.insertOne(packages);
            res.send(result);
        })
        app.get("/packages", async (req, res) => {
            const result = await packageCollection.find().toArray();
            res.send(result);
        });

        app.get("/offers", async (req, res) => {
            const result = await offerCollection.find().toArray();
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// checking server
app.get('/', (req, res) => {
    res.send('Yoga Server is running');
})

app.listen(port, () => {
    console.log(`Yoga Server is running on port: ${port}`);
})