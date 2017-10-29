using System.Collections.Generic;

namespace CitySurfing.RestService.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string FullName { get; set; }

        public string About { get; set; }

        public string PhoneNumber { get; set; }

        public ICollection<SkillDto> Skills { get; set; }
    }
}