using Signals.Interfaces;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.Specialized;

namespace Signals.Services
{
    public class UserService : IUserService
    {
        private readonly ObservableConcurrentDictionary<string, string> _users = new ObservableConcurrentDictionary<string, string>();
        public IDictionary<string, string> Users => _users;

        public event EventHandler UsersCountChanged;

        public UserService()
        {
            _users.CollectionChanged += OnCollectionChanged;
        }

        private void OnCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            UsersCountChanged?.Invoke(sender, e);
        }
    }
}
