using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitySurfing.RestService.Dtos
{
    public class JobFilterCriteriaDto
    {

        public double? MaxPrice { get; set; }
        public double? MinPrice { get; set; }
        public string Location { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public IEnumerable<string> SkillNames { get; set; }

    }
}