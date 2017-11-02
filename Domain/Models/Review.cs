using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CitySurfing.Domain.Models
{
    public class Review
    {

        [Key]
        public int Id { get; set; }

        public int Rating { get; set; }

        public string Title { get; set; }

        public string Comment { get; set; }

    }
}
