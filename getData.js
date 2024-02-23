import axios from 'axios';
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb://mongoadmin:secret@localhost:27017';
const client = new MongoClient(MONGODB_URI)

const options = {
  method: 'GET',
  url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
  params: {
    country: 'us',
    lang: 'en',
    currentpage: '0',
    pagesize: '30',
    categories: 'men_all',
    concepts: 'H&M MAN'
  },
  headers: {
    'X-RapidAPI-Key': 'RAPID_API_KEY',
    'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
  }
};

async function insertDataIntoMongo() {
    try {
        await client.connect();
        const database = client.db('test');
        const collection = database.collection('products');
        
        const response = await axios.request(options);
        const products = response.data["results"]    g
    
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