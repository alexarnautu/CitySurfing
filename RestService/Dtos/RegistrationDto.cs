using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CitySurfing.RestService.Dtos
{
    public class RegistrationDto
    {
        public string Email { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string About { get; set; }
        public string UserName { get; set; }

    }
}