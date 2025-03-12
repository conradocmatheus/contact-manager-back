/*
  Warnings:

  - You are about to drop the `FavoriteContact` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[FavoriteContact] DROP CONSTRAINT [FavoriteContact_contactId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[FavoriteContact] DROP CONSTRAINT [FavoriteContact_userId_fkey];

-- DropTable
DROP TABLE [dbo].[FavoriteContact];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
