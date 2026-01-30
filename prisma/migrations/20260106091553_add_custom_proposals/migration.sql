-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- DropIndex
DROP INDEX "bookings_calendlyEventId_key";

-- DropIndex
DROP INDEX "bookings_scheduledAt_idx";

-- DropIndex
DROP INDEX "bookings_stripeCheckoutId_key";

-- DropIndex
DROP INDEX "bookings_stripePaymentId_key";

-- DropIndex
DROP INDEX "session_types_active_idx";

-- DropIndex
DROP INDEX "session_types_slug_idx";

-- DropIndex
DROP INDEX "users_discordId_idx";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "session_types" ALTER COLUMN "maxPlayers" DROP NOT NULL,
ALTER COLUMN "maxPlayers" DROP DEFAULT;

-- CreateTable
CREATE TABLE "custom_session_proposals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "maxPlayers" INTEGER,
    "status" "ProposalStatus" NOT NULL DEFAULT 'PENDING',
    "bookingId" TEXT,
    "stripePriceId" TEXT,
    "stripeProductId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "custom_session_proposals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "custom_session_proposals_bookingId_key" ON "custom_session_proposals"("bookingId");

-- CreateIndex
CREATE INDEX "custom_session_proposals_userId_idx" ON "custom_session_proposals"("userId");

-- CreateIndex
CREATE INDEX "custom_session_proposals_status_idx" ON "custom_session_proposals"("status");

-- CreateIndex
CREATE INDEX "bookings_sessionTypeId_idx" ON "bookings"("sessionTypeId");

-- AddForeignKey
ALTER TABLE "custom_session_proposals" ADD CONSTRAINT "custom_session_proposals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_session_proposals" ADD CONSTRAINT "custom_session_proposals_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
