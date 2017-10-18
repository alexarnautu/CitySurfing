using System.ComponentModel.DataAnnotations;

namespace CitySurfing.Domain.Models
{
    public abstract class ModelBase
    {

        [Key]
        public int Id { get; set; }
    }
}
