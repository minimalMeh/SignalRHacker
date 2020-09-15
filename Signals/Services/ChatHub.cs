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

        public async Task Send(string message)
        {
            await this.Clients.All.SendAsync("Send", message);
        }

        public override async Task OnConnectedAsync()
        {
            if (_users.Keys.Contains(Context.ConnectionId))
            {
                return;
            }

            _users[Context.ConnectionId] = "an0n #" + _users.Count;
            await this.Clients.All.SendAsync("NewUser", _users[Context.ConnectionId]);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await this.Clients.All.SendAsync("UserLeft", _users[Context.ConnectionId]);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
