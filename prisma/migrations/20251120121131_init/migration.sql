-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "costPerCigg" INTEGER NOT NULL,
    "initDailyAvg" INTEGER NOT NULL,
    "initLifeExpectancy" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmokeLogs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "penaltyMinutes" INTEGER NOT NULL DEFAULT 11,
    "costSpent" INTEGER NOT NULL,

    CONSTRAINT "SmokeLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitState" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HabitState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "HabitState_userId_key" ON "HabitState"("userId");

-- AddForeignKey
ALTER TABLE "SmokeLogs" ADD CONSTRAINT "SmokeLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitState" ADD CONSTRAINT "HabitState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
