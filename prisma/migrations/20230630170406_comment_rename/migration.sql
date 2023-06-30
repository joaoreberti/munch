/*
  Warnings:

  - You are about to drop the column `commnent` on the `RestaurantReview` table. All the data in the column will be lost.
  - Added the required column `comment` to the `RestaurantReview` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RestaurantReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RestaurantReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RestaurantReview_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RestaurantReview" ("createdAt", "id", "rating", "restaurantId", "updatedAt", "userId") SELECT "createdAt", "id", "rating", "restaurantId", "updatedAt", "userId" FROM "RestaurantReview";
DROP TABLE "RestaurantReview";
ALTER TABLE "new_RestaurantReview" RENAME TO "RestaurantReview";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
