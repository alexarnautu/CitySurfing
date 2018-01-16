using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using System.Web.Script.Serialization;

namespace CitySurfing.Domain.Models
{
    [DataContract]
    public sealed class User : IdentityUser
    {
        public User()
        {
            UserName = Email;
        }

        [DataMember]
        public override string Id { get; set; }

        [DataMember]
        [Required]
        [EmailAddress]
        public override string Email { get; set; }

        [DataMember]
        [Required]
        public string FullName { get; set; }

        [DataMember]
        public string About { get; set; }

        [DataMember]
        public override string PhoneNumber { get; set; }

        [ScriptIgnore]
        public ICollection<Applyment> Applyments { get; set; } = new HashSet<Applyment>();

        public ICollection<Job> Jobs { get; set; } = new HashSet<Job>();

        public ICollection<Skill> Skills { get; set; } = new HashSet<Skill>();
    }
}