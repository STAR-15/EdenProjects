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

        public bool AddUser(UserTO user)
        {
            var sql = @"insert into User values 
           (NULL,@UserName,@Password,@CreateTime,@UpdateTime,@Phone,@Email,@Description,@Role)";
            var result = DbManager.NewConnection().Execute(sql, new
            {
                UserName = user.UserName,
                Password = user.Password,
                CreateTime = DateTime.Now,
                UpdateTime = DateTime.Now,
                Phone = user.Phone,
                Email = user.Email,
                Description = user.Description,
                Role = (int)user.Role
            });
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public bool UpdateUser(UserTO user)
        {
            var sql = @"update User 
            set Password = @Password,
            Phone = @Phone,
            Email = @Email,
            Description = @Description
            where UserId = @UserId
            ";
            var result = DbManager.NewConnection().Execute(sql,
                new
                {
                    Password = user.Password,
                    Phone = user.Phone,
                    Email = user.Email,
                    Description = user.Description,
                    UserId = user.UserId
                });
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public bool DeleteUser(int userId)
        {
            var sql = @"delete from User where UserId=@UserId";
            var result = DbManager.NewConnection().Execute(sql,
                new
                {
                    UserId = userId
                });
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public List<UserTO> GetUserList(string key)
        {
            var sql = @"select * from User ";
            if (!string.IsNullOrEmpty(key))
            {
                sql += "where UserName = @UserName";
            }
            var result = DbManager.NewConnection().Query<UserTO>(sql, new { UserName = key });
            return result.ToList();
        }
    }
}
