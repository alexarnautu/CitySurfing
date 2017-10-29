using CitySurfing.Domain.Models;
using System;

namespace CitySurfing.RestService.Dtos
{
    public class ApplymentDto
    {
        public string Proposal { get; set; }

        public bool IsApproved { get; set; }

        public DateTime Created { get; set; }

        public Review Review { get; set; }

        public UserDto User { get; set; }

        public JobDto Job { get; set; }
    }
}