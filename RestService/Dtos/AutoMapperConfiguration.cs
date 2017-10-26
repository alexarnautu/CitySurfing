using AutoMapper;
using CitySurfing.Domain.Models;

namespace CitySurfing.RestService.Dtos
{
    public static class AutoMapperConfiguration
    {
        public static void Configure()
        {
            //Configure method needs to be called once per AppDomain.

            Mapper.Initialize(config =>
            {
                config.CreateMap<Skill, SkillDto>();
            });
        }
    }
}