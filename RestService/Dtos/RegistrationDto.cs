using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CitySurfing.RestService.Dtos
{
    public class RegistrationDto
    {
        [Required (ErrorMessage = "Field Required")]
        [EmailAddress (ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Field Required")]
        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        [Required (ErrorMessage = "Field Required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        public string Password { get; set; }

        public string About { get; set; }

        [Required(ErrorMessage = "Field Required")]
        public string UserName { get; set; }

    }
}