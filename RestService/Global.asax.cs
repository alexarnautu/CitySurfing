using System.Web;
using System.Web.Http;
using CitySurfing.RestService.Dtos;

namespace CitySurfing.RestService
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            AutoMapperConfiguration.Configure();
        }
    }
}
