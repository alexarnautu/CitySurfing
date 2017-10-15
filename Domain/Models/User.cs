using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CitySurfing.Domain.Models
{
    [DataContract]
    class User : IdentityUser
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

    }
}
