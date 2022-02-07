/*
  Warnings:

  - You are about to drop the column `number` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the `_SeatToTicket` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `numberOfSeat` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SeatToTicket" DROP CONSTRAINT "_SeatToTicket_A_fkey";

-- DropForeignKey
ALTER TABLE "_SeatToTicket" DROP CONSTRAINT "_SeatToTicket_B_fkey";

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "number",
ADD COLUMN     "numberOfSeat" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_SeatToTicket";

-- CreateTable
CREATE TABLE "SeatOnTicket" (
    "seatId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "SeatOnTicket_pkey" PRIMARY KEY ("seatId","ticketId")
);

-- AddForeignKey
ALTER TABLE "SeatOnTicket" ADD CONSTRAINT "SeatOnTicket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatOnTicket" ADD CONSTRAINT "SeatOnTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
