using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        public User UserFrom { get; set; }

        [ForeignKey("UserFrom")]
        public string UserFromId { get; set; }

        public User UserTo { get; set; }

        [ForeignKey("UserTo")]
        public string UserToId { get; set; }

    }
}
