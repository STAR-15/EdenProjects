using System;
using System.Security.Cryptography;
using System.Text;

namespace Eden.Server
{
    public class TextHelper
    {
        public static string Sha256(string plainText)
        {
            SHA256Managed _sha256 = new SHA256Managed();
            byte[] _cipherText = _sha256.ComputeHash(Encoding.Default.GetBytes(plainText));
            return Convert.ToBase64String(_cipherText);
        }


        public static string ReplaceEscapeCharacterForDBLikeSearch(string value)
        {
            if (string.IsNullOrEmpty(value))
                return value;

            return string.Format("%{0}%", value.Trim().Replace(@"\", @"\\").Replace(@"[", @"\[")
                                                        .Replace(@"]", @"\]")
                                                        .Replace(@"_", @"\_")
                                                        .Replace(@"%", @"\%")
                                                         );
        }
    }
}
