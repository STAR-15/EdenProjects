using Eden.Server;
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
        public JsonResult GetList(string key)
        {
            var users = _userRepository.GetUserList(key);
            return Json(users,JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public bool AddUser(UserTO user)
        {
            user.Password = TextHelper.Sha256(user.Password);
            var result = _userRepository.AddUser(user);
            if (result)
            {
                return true;
            }
            return false;
        }
    }
}