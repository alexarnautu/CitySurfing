using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitySurfing.RestService.Dtos
{
    public class ReviewDto
    {
        public int Id { get; set; }

        public int Rating { get; set; }

        public string Title { get; set; }

        public string Comment { get; set; }
    }
}