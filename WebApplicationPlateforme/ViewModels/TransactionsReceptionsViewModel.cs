using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPlateforme.ViewModels
{
    public class TransactionsReceptionsViewModel
    {
        public int idAff { get; set; }
        public int idTr { get; set; }
        public int idRec { get; set; }
        public string dateAff { get; set; }
        public string userSender { get; set; }
        public string receiver { get; set; }
        public string userReceiver { get; set; }
        public string dateReceiving { get; set; }
    }
}
