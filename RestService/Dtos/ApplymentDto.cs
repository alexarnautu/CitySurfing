using System;

namespace CitySurfing.RestService.Dtos
{
    public class ApplymentDto
    {
        public string Proposal { get; set; }

        public bool IsApproved { get; set; }

        public DateTime Created { get; set; }

        public int? Rating { get; set; }

        public UserDto User { get; set; }

        public JobDto Job { get; set; }
    }
}