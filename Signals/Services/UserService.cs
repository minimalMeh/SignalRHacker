using Signals.Interfaces;
using System;
using System.Collections.Generic;
using System.Collections.Concurrent;

using System.Linq;
using System.Threading.Tasks;
using System.Collections.Specialized;

namespace Signals.Services
{
    public class UserService : IUserService
    {
        private ObservableConcurrentDictionary<string, string> _users = new ObservableConcurrentDictionary<string, string>();
        public IDictionary<string, string> Users => _users;

        public UserService()
        {
            this._users.CollectionChanged += OnCollectionChanged;
        }

        private void OnCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            this.UsersCountChanged?.Invoke(sender, e);
        }

        public event EventHandler UsersCountChanged;
    }
}
