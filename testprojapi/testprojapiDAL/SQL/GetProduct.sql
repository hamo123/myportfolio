--I don't really have a use case for this in this project at the moment
if EXISTS (SELECT * FROM sysobjects WHERE NAME = 'GetProduct' AND xtype = 'P')
	DROP PROCEDURE GetProduct
go

CREATE PROCEDURE [dbo].[GetProduct](@Product INT)
AS
BEGIN

	SELECT ID, Description, Title, Cost, StockCount FROM Product WHERE ID = @Product
END
GO
