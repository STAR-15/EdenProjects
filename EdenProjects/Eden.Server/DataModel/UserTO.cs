using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Eden.Server.EnumClass;

namespace Eden.Server.DataModel
{
    public class UserTO
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public DateTime CreateTime { get; set; }

        public DateTime UpdateTime { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Description { get; set; }

        public RoleType Role { get; set; }

        public string CreateTimeLocal
        {
            get
            {
                return this.CreateTime.ToString("yyyy-MM-dd HH:mm:ss");
            }
        }

        public string UpdateTimeLocal
        {
            get
            {
                return this.CreateTime.ToString("yyyy-MM-dd HH:mm:ss");
            }
        }
    }
}
