namespace CitySurfing.RestService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeJobTypeName : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Jobs", name: "TypeId", newName: "CategoryId");
            RenameIndex(table: "dbo.Jobs", name: "IX_TypeId", newName: "IX_CategoryId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Jobs", name: "IX_CategoryId", newName: "IX_TypeId");
            RenameColumn(table: "dbo.Jobs", name: "CategoryId", newName: "TypeId");
        }
    }
}
