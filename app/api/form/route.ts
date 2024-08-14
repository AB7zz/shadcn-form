import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const companyName = formData.get('companyName') as string;
    const companyWebpage = formData.get('companyWebpage') as string;
    const companyDescription = formData.get('companyDescription') as string;
    const productDescription = formData.get('productDescription') as string;
    const toneOfVoice = formData.get('toneOfVoice') as string;
    const strategy = formData.get('strategy') as string;

    const file1 = formData.get('file1') as File | null;
    const file2 = formData.get('file2') as File | null;
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

    const result = await prisma.company.create({
      data: {
        companyName,
        companyWebpage,
        companyDescription,
        productDescription,
        toneOfVoice,
        strategy,
        file1: file1Base64,
        file2: file2Base64
      },
    });

    return NextResponse.json({ message: 'Company data inserted successfully!', result, ok: true });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ message: 'Error inserting data', error, ok: false }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}