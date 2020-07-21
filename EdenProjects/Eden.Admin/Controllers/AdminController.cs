using Eden.Server.DataModel;
using Eden.Server.Repository;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Eden.Admin.Controllers
{
    public class AdminController : Controller
    {
        private readonly UserRepository _userRepository;

        public AdminController()
        {
            _userRepository = new UserRepository();
        }

        // GET: Admin
        public ActionResult List()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetTest()
        {
            var users = _userRepository.GetUserList("Eden");
            return Json(users,JsonRequestBehavior.AllowGet);
        }
    }
}