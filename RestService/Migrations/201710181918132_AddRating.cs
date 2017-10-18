namespace CitySurfing.RestService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRating : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Applyments", "Rating", c => c.Int(nullable: false));
            AddColumn("dbo.Jobs", "CreatorId", c => c.String(maxLength: 128));
            AddColumn("dbo.Jobs", "Rating", c => c.Int(nullable: false));
            CreateIndex("dbo.Jobs", "CreatorId");
            AddForeignKey("dbo.Jobs", "CreatorId", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Jobs", "CreatorId", "dbo.AspNetUsers");
            DropIndex("dbo.Jobs", new[] { "CreatorId" });
            DropColumn("dbo.Jobs", "Rating");
            DropColumn("dbo.Jobs", "CreatorId");
            DropColumn("dbo.Applyments", "Rating");
        }
    }
}
