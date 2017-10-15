using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CitySurfing.Domain.Models
{
    class Candidate : IModel
    {

        public int Id { get; set; }
        
        public string Proposal { get; set; }

        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        public Job Job { get; set; }

        [ForeignKey(nameof(Job))]
        public int JobId { get; set; }

        // TODO clarify status

    }
}
