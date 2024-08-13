import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function POST(req: NextRequest) {
  try {
    // Parse the FormData
    const formData = await req.formData();

    // Extract data
    const companyName = formData.get('companyName');
    const companyWebpage = formData.get('companyWebpage');
    const companyDescription = formData.get('companyDescription');
    const productDescription = formData.get('productDescription');
    const toneOfVoice = formData.get('toneOfVoice');
    const strategy = formData.get('strategy');

    // Handle file upload
    const file1 = formData.get('file1');
    const file2 = formData.get('file2');
    let file1Base64 = null;
    let file2Base64 = null;

    if (file1 && file1.size > 0) {
      const arrayBuffer = await file1.arrayBuffer();
      file1Base64 = Buffer.from(arrayBuffer).toString('base64');
    }
    if (file2 && file2.size > 0) {
      const arrayBuffer = await file2.arrayBuffer();
      file2Base64 = Buffer.from(arrayBuffer).toString('base64');
    }

    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("companies"); 

    // Insert the data into MongoDB
    const result = await collection.insertOne({
      companyName,
      companyWebpage,
      companyDescription,
      productDescription,
      toneOfVoice,
      strategy,
      file1: file1Base64, 
      file2: file2Base64,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Company data inserted successfully!', result, ok: true });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ message: 'Error inserting data', error, ok: false }, { status: 500 });
  }
}
