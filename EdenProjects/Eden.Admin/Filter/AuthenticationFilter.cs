using System.Web;
using System.Web.Mvc;

namespace Eden.Admin.Filter
{
    public class AuthenticationFilter : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var formsAuthenticationService = new FormsAuthenticationService();
            var user = formsAuthenticationService.GetAuthenticatedUser();

            if (user == null)
                return false;

            return true;
        }
    }
}