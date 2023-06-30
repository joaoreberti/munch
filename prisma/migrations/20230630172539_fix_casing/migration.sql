/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Restaurant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Restaurant" ("address", "createdAt", "email", "id", "name", "updatedAt") SELECT "address", "createdAt", "email", "id", "name", "updatedAt" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
CREATE UNIQUE INDEX "Restaurant_name_key" ON "Restaurant"("name");
CREATE UNIQUE INDEX "Restaurant_email_key" ON "Restaurant"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
