using CitySurfing.Domain.Models;
using System;
using System.Collections.Generic;

namespace CitySurfing.RestService.Dtos
{
    public class JobDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double? Price { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public DateTime Created { get; set; }

        public string Location { get; set; }

        public bool IsAvailable { get; set; }

        public ICollection<Review> Reviews { get; set; }

        public UserDto Creator { get; set; }

        public CategoryDto Category { get; set; }

        public ICollection<SkillDto> RequiredSkills { get; set; }

        public ICollection<ApplymentDto> Applyments { get; set; }
    }
}