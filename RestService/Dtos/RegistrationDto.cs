using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitySurfing.RestService.Dtos
{
    public class RegistrationDto
    {
        public string Email { get; internal set; }
        public string FullName { get; internal set; }
        public string PhoneNumber { get; internal set; }
        public string Password { get; internal set; }
        public string About { get; internal set; }

    }
}