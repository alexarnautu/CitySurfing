using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Runtime.Serialization;

namespace CitySurfing.Domain.Models
{
    [DataContract]
    [Table("Users")]
    public class User : IdentityUser
    {

        [DataMember]
        public override string Id { get; set; }

        [DataMember]
        public override string Email { get; set; }

        [DataMember]
        public string FullName { get; set; }

        [DataMember]
        public string About { get; set; }

        [DataMember]
        public override string PhoneNumber { get; set; }

        public virtual ICollection<Applyment> Applyments { get; set; } = new HashSet<Applyment>();

        public virtual ICollection<Job> Jobs { get; set; } = new HashSet<Job>();

        public virtual ICollection<Skill> Skills { get; set; } = new HashSet<Skill>();
    }
}