using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.Controllers.SMSSender
{
    public class SMS
    {

        // Amanah Jazan Account - al amana data  
        private static string MyNumber = "@@@";
        private static string MyPassword = "@@@";
        private static string UserName = "@@@";
        private static string DateSend = "";//&timeSend=01:00:00&dateSend=12/12/2012";

        private static string _sendSMS(string MobileNo, string Msg, string SenderName)
        {
            //  WebRequest req = WebRequest.Create("http://www.mobily.ws/api/msgSend.php");
            WebRequest req = WebRequest.Create("https://api.taqnyat.sa/msgSend.php");
            string s1 = "mobile=" + MyNumber + "&password=" + MyPassword + "&numbers=" + MobileNo + "&sender=" + SenderName + "&msg=" + ConvertToUnicode(Msg) + DateSend + "&applicationType=24";
            req.Method = "POST";
            req.ContentType = "application/x-www-form-urlencoded";
            byte[] byteArray = Encoding.UTF8.GetBytes(s1);
            req.ContentLength = byteArray.Length;
            Stream dataStream = req.GetRequestStream();
            dataStream.Write(byteArray, 0, byteArray.Length);
            dataStream.Close();
            WebResponse resp = req.GetResponse();
            Stream s = resp.GetResponseStream();
            StreamReader sr = new StreamReader(s, Encoding.ASCII);
            string doc = sr.ReadToEnd();
            return doc;
        }

        private static string ConvertToUnicode(string val)
        {
            string msg2 = null;
            int i = 0;
            msg2 = "";

            for (i = 0; i <= val.Length - 1; i++)
            {
                msg2 = msg2 + ConvertToUnicode(System.Convert.ToChar(val.Substring(i, 1)));
            }
            return msg2;
        }

        private static string ConvertToUnicode(char ch)
        {
            System.Text.UnicodeEncoding class1 = new System.Text.UnicodeEncoding();
            byte[] msg = class1.GetBytes(System.Convert.ToString(ch));

            return fourDigits(msg[1] + msg[0].ToString("X"));
        }
        private static string fourDigits(string val)
        {
            string result = string.Empty;
            switch ((val.Length))
            {

                case 1:
                    result = "000" + val;
                    break;
                case 2:
                    result = "00" + val;
                    break;
                case 3:
                    result = "0" + val;
                    break;
                case 4:
                    result = val;
                    break;
            }
            return result;
        }
    }
}
