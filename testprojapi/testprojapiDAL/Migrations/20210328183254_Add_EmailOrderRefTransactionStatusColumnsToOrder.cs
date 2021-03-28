using Microsoft.EntityFrameworkCore.Migrations;

namespace testprojapiDAL.Migrations
{
    public partial class Add_EmailOrderRefTransactionStatusColumnsToOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderRef",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransactionStatus",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "OrderRef",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TransactionStatus",
                table: "Order");
        }
    }
}
