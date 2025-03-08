/*
  Warnings:

  - You are about to drop the column `nome` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Contact] DROP COLUMN [nome],
[telefone];
ALTER TABLE [dbo].[Contact] ADD [name] NVARCHAR(1000) NOT NULL,
[phone] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [nome],
[senha];
ALTER TABLE [dbo].[User] ADD [name] NVARCHAR(1000) NOT NULL,
[password] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
