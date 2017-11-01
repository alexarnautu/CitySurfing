using CitySurfing.Domain.Models;
using System;

namespace CitySurfing.RestService.Dtos
{
    public class ApplymentDto
    {
        public string UserId { get; set; }

        public int JobId { get; set; }

        public string Proposal { get; set; }

        public bool IsApproved { get; set; }

        public Review Review { get; set; }
    }
}