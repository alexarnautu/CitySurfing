using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace CitySurfing.RestService.Services
{
    public class EmailService
    {

        public static string email = ConfigurationManager.AppSettings["NoreplyEmail"];
        public static string password = ConfigurationManager.AppSettings["NoreplyPassword"];

        public bool SendEmail(string to, string subject, string body)
        {
            var smpt = new SmtpClient("smtp.gmail.com", 587);
            smpt.UseDefaultCredentials = false;
            smpt.EnableSsl = true;
            smpt.Credentials = new NetworkCredential(email, password);
            var message = new MailMessage("city.surfing.noreply@gmail.com", to, subject, body);

            try
            {
                smpt.Send(message);
            }
            catch
            {
                return false;
            }
            return true;
        }

    }
}