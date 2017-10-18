using System.Collections.Generic;

namespace CitySurfing.Domain.Models
{
    public class Skill : ModelBase
    {
        public string Name { get; set; }

        public virtual ICollection<User> Users { get; set; } = new HashSet<User>();

        public virtual ICollection<Job> Jobs { get; set; } = new HashSet<Job>();
    }
}
