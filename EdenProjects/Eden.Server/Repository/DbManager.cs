﻿using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eden.Server.Repository
{
    static class DbManager
    {
        private static readonly Lazy<ConnectionStringSettings> sqlConnectionString = new Lazy<ConnectionStringSettings>(() =>
        {

            string dataFolder = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"DBFile\SQLData");
            // Create Data Directory If It Doesn't Already Exist.
            if (!Directory.Exists(dataFolder))
            {
                Directory.CreateDirectory(dataFolder);
            }
            var dbName = @"AdminDB";
            var dbFile = Path.Combine(dataFolder, "Admin_DB.db");

            if (!File.Exists(dbFile))
            {
                CreateDatabase(dbFile);
            }

            return new ConnectionStringSettings(dbName, @"Data Source=" + dbFile);

        });

        public static IDbConnection NewConnection()
        {
            return new SQLiteConnection(sqlConnectionString.Value.ConnectionString);
            //var dbconn = new SQLiteConnection(sqlConnectionString.Value.ConnectionString);
            //dbconn.Open();
            //return dbconn;
        }

        #region Setup DataBase

        public static bool CreateDatabase(string dbFileName)
        {
            string connectionString = String.Format(@"Data Source=" + dbFileName);
            SQLiteConnection.CreateFile(dbFileName);
            using (var conn = new SQLiteConnection(connectionString))
            {
                conn.TryExecute(@"
                    CREATE TABLE User
                        (
                            UserId INTEGER PRIMARY KEY autoincrement,
                            UserName TEXT NOT NULL,
                            Password TEXT NOT NULL
                        );");
                //                conn.TryExecute(@"
                //                    INSERT INTO User
                //                    (
                //                        UserName,
                //                        Password,
                //                    )VALUES
                //                    (
                //                        'Eden',
                //                        'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI='      
                //                    );");
            }

            if (File.Exists(dbFileName)) return true;
            else return false;
        }
        private static void TryExecute(this IDbConnection conn, string sql)
        {
            try
            {
                conn.Execute(sql);
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
    }
}