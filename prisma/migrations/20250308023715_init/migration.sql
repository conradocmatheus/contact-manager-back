BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [senha] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Contact] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [telefone] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Contact_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Contact_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[FavoriteContact] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [contactId] INT NOT NULL,
    CONSTRAINT [FavoriteContact_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [FavoriteContact_userId_contactId_key] UNIQUE NONCLUSTERED ([userId],[contactId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Contact] ADD CONSTRAINT [Contact_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FavoriteContact] ADD CONSTRAINT [FavoriteContact_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FavoriteContact] ADD CONSTRAINT [FavoriteContact_contactId_fkey] FOREIGN KEY ([contactId]) REFERENCES [dbo].[Contact]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
