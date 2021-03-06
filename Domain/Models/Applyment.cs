﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CitySurfing.Domain.Models
{
    public class Applyment
    {
        public Applyment()
        {
            Created = DateTime.Now;
            IsApproved = false;
        }

        //Primary key would be composed of UserId and JobId in order to prevent duplicate applyments.
        [Key, Column(Order = 0), ForeignKey(nameof(User))]
        public string UserId { get; set; }

        [Key, Column(Order = 1), ForeignKey(nameof(Job))]
        public int JobId { get; set; }

        public string Proposal { get; set; }

        public bool IsApproved { get; set; }

        public DateTime Created { get; set; }

        public virtual User User { get; set; }

        public virtual Job Job { get; set; }

        public virtual Review Review { get; set; }

        [NotMapped]
        public string FullName { get; set; }

    }
}
