namespace CitySurfing.Domain.Models
{
    public class Category : IModel
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

    }
}