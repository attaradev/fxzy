-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('GHS', 'NGN', 'KES', 'UGX', 'ZAR', 'USD', 'EUR', 'GBP', 'CAD');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PROCESSING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LiquidityProvider" AS ENUM ('EXNESS', 'AVATRADE', 'TRADENATION', 'OCTAFX', 'PEPPERSTONE', 'VANTAGEFX', 'XM', 'AXI', 'FXCM', 'FBS', 'XE', 'IC_MARKETS');

-- CreateTable
CREATE TABLE "Trader" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'GHS',
    "traderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "buyAmount" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PROCESSING',
    "sourceCurrency" "Currency" NOT NULL,
    "receiptCurrency" "Currency" NOT NULL,
    "receiptAmount" INTEGER NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "traderId" TEXT NOT NULL,
    "provider" "LiquidityProvider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trader_email_key" ON "Trader"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Trader_sub_key" ON "Trader"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_accountNumber_key" ON "BankAccount"("accountNumber");

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "Trader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "Trader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
