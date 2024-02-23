import { MongoClient } from 'mongodb';


const MONGODB_URI = 'mongodb://mongoadmin:secret@localhost:27017';
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

async function insertDataIntoMongo() {
    try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('products');
  
      const products = options.results
  
      // insert each product into MongoDB
      const insertResult = await collection.insertMany(products);
      console.log(`${insertResult.insertedCount} products inserted into MongoDB`);
    } catch (error) {
      console.error('Error inserting data into MongoDB:', error);
    } finally {
      await client.close();
    }
  }
  
  
insertDataIntoMongo();