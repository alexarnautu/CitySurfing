using System.ComponentModel.DataAnnotations.Schema;

namespace CitySurfing.Domain.Models
{
    public class Applyment : ModelBase
    {

        public string Proposal { get; set; }

        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; }

        public Job Job { get; set; }

        public bool IsApproved { get; set; }

        [ForeignKey(nameof(Job))]
        public int JobId { get; set; }

        public int Rating { get; set; }

    }
}
