-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyWebpage" TEXT NOT NULL,
    "companyDescription" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "toneOfVoice" TEXT NOT NULL,
    "fomoStrategy" TEXT,
    "amsiStrategy" TEXT,
    "file1" TEXT,
    "file2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
