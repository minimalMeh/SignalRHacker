using Signals.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Signals.Services
{
    public class UserService : IUserService
    {
        private Dictionary<string, string> _users = new Dictionary<string, string>();
        public IDictionary<string, string> Users => _users;

    }
}
