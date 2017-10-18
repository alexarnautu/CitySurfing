using System.ComponentModel.DataAnnotations.Schema;

namespace CitySurfing.Domain.Models
{
    public class Candidate : ModelBase
    {

        public string Proposal { get; set; }

        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; }

        public Job Job { get; set; }

        [ForeignKey(nameof(Job))]
        public int JobId { get; set; }

        // TODO clarify status

    }
}
