-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('nobody', 'only_matches', 'everyone');

-- CreateTable
CREATE TABLE "profiles" (
    "userId" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "dob" TIMESTAMP(3),
    "sex" "Sex" NOT NULL,
    "relationshipGoal" TEXT NOT NULL,
    "religion" TEXT,
    "profileCompletionPercentage" INTEGER,
    "lastUserNameChange" TIMESTAMP(3),
    "visibility" "Visibility" NOT NULL DEFAULT 'everyone',
    "distance" DOUBLE PRECISION,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ProfileLocation" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProfileLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileImage" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfileImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileAttribute" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "bio" TEXT,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "bloodType" TEXT,

    CONSTRAINT "ProfileAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalDetail" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "occupation" TEXT,
    "currentCompany" TEXT,
    "school" TEXT,
    "degreeType" TEXT,

    CONSTRAINT "ProfessionalDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalLanguage" (
    "id" SERIAL NOT NULL,
    "professionalDetailId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "ProfessionalLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lifestyle" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "pets" TEXT[],
    "drinkingHabits" TEXT,
    "smokingHabits" TEXT,
    "sleepingHabit" TEXT,
    "workout" TEXT,
    "socialMediaPresence" TEXT,

    CONSTRAINT "Lifestyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preference" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "moviePrefs" TEXT[],
    "musicPrefs" TEXT[],
    "travelPrefs" TEXT[],
    "dietaryPrefs" TEXT[],
    "bookPrefs" TEXT[],

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterPreference" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "relationshipGoal" TEXT,
    "religion" TEXT,
    "degreeType" TEXT,
    "hasBio" BOOLEAN,
    "fallback" BOOLEAN,

    CONSTRAINT "FilterPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonaDetail" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "zodiacSign" TEXT,
    "personalityType" TEXT,
    "communicationStyle" TEXT,
    "familyPlans" TEXT,
    "genotype" TEXT,

    CONSTRAINT "PersonaDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "interest" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedContact" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "blockedUserId" UUID NOT NULL,

    CONSTRAINT "BlockedContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileLocation_profileId_key" ON "ProfileLocation"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileAttribute_profileId_key" ON "ProfileAttribute"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalDetail_profileId_key" ON "ProfessionalDetail"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Lifestyle_profileId_key" ON "Lifestyle"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_profileId_key" ON "Preference"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "FilterPreference_profileId_key" ON "FilterPreference"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaDetail_profileId_key" ON "PersonaDetail"("profileId");

-- AddForeignKey
ALTER TABLE "ProfileLocation" ADD CONSTRAINT "ProfileLocation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileImage" ADD CONSTRAINT "ProfileImage_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileAttribute" ADD CONSTRAINT "ProfileAttribute_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalDetail" ADD CONSTRAINT "ProfessionalDetail_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalLanguage" ADD CONSTRAINT "ProfessionalLanguage_professionalDetailId_fkey" FOREIGN KEY ("professionalDetailId") REFERENCES "ProfessionalDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lifestyle" ADD CONSTRAINT "Lifestyle_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterPreference" ADD CONSTRAINT "FilterPreference_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonaDetail" ADD CONSTRAINT "PersonaDetail_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedContact" ADD CONSTRAINT "BlockedContact_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
