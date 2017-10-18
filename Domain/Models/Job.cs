using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CitySurfing.Domain.Models
{
    public class Job : ModelBase
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Location { get; set; }

        public Category Type { get; set; }

        [ForeignKey(nameof(Type))]
        public int TypeId { get; set; }

        public ICollection<Skill> RequiredSkills { get; set; }

        // TODO: clarify status

    }
}
