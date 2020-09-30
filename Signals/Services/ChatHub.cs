using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Signals.Services
{
    public class ChatHub : Hub
    {
        private static Dictionary<string, string> _users = new Dictionary<string, string>();

        public Task Send(string message)
        {
            return this.Clients.All.SendAsync("Send", message, _users[Context.ConnectionId]);
        }

        public async Task GetConnectedUsers()
        {
            var connectedUsers = _users.Where(x => x.Key != Context.ConnectionId).Select(x => x.Value).ToList();
            await this.Clients.Client(Context.ConnectionId).SendAsync("GetConnectedUsers", connectedUsers);
        }

        public override async Task OnConnectedAsync()
        {
            if (_users.Keys.Contains(Context.ConnectionId))
            {
                return;
            }

            _users[Context.ConnectionId] = "an0n #" + _users.Count;
            await this.Clients.All.SendAsync("NewUser", _users[Context.ConnectionId]);
            await this.Clients.Client(Context.ConnectionId).SendAsync("HubLoaded");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await this.Clients.All.SendAsync("UserLeft", _users[Context.ConnectionId]);
            _users.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
