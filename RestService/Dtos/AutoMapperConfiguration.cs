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
                config.CreateMap<SkillDto, Skill>();

                config.CreateMap<Category, CategoryDto>();
                config.CreateMap<CategoryDto, Category>();

                config.CreateMap<Applyment, ApplymentDto>();
                config.CreateMap<ApplymentDto, Applyment>();

                config.CreateMap<Job, JobDto>().MaxDepth(1);
                config.CreateMap<JobDto, Job>().MaxDepth(1);
                
                config.CreateMap<User, UserDto>();
                config.CreateMap<UserDto, User>();
                config.CreateMap<User, RegistrationDto>();
                config.CreateMap<RegistrationDto, User>();
            });
        }
    }
}