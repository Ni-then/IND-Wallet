-- CreateTable
CREATE TABLE "HdfcAccount" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HdfcAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HdfcAccount_userId_key" ON "HdfcAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HdfcAccount_mobileNumber_key" ON "HdfcAccount"("mobileNumber");
