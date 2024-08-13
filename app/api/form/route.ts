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
    const body = await req.json();

    const {
      companyName,
      companyWebpage,
      companyDescription,
      productDescription,
      toneOfVoice,
      fomoStrategy,
      amsiStrategy,
    } = body;

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
      fomoStrategy,
      amsiStrategy,
      createdAt: new Date(), 
    });

    return NextResponse.json({ message: 'Company data inserted successfully!', result, ok: true });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ message: 'Error inserting data', error, ok: false }, { status: 500 });
  }
}
