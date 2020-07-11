using Dapper;
using Eden.Server.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eden.Server.Repository
{
    public class UserRepository
    {
        public UserTO GetUserById(int userId)
        {
            var sql = @"select * from User where UserId = @UserId";

            var result = DbManager.NewConnection().Query<UserTO>(sql, new { UserId = userId }).FirstOrDefault();
            return result;
        }

        public UserTO GetUser(string userName)
        {
            var sql = @"select * from User where UserName = @UserName";
            var result = DbManager.NewConnection().Query<UserTO>(sql, new { UserName = userName }).FirstOrDefault();
            return result;
        }
    }
}
