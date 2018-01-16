using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CitySurfing.Domain.Models
{
    public class Job : ModelBase
    {
        public Job()
        {
            IsAvailable = true;
            Created = DateTime.Now;
        }

        public string Title { get; set; }

        public string Description { get; set; }

        public double? Price { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public DateTime Created { get; set; }

        public string Location { get; set; }

        public bool IsAvailable { get; set; }

        [ForeignKey(nameof(Creator))]
        public string CreatorId { get; set; }

        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }

        public virtual User Creator { get; set; }

        public virtual Category Category { get; set; }

        public virtual ICollection<Skill> RequiredSkills { get; set; } = new HashSet<Skill>();

        public virtual ICollection<Applyment> Applyments { get; set; } = new HashSet<Applyment>();

    }
}
