using Microsoft.AspNetCore.SignalR;
using Signals.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Signals.Services
{
    public class ChatHub : Hub
    {
        private readonly IUserService _userService;

        public ChatHub(IUserService userService) : base()
        {
            this._userService = userService;
        }

        //public event EventHandler OnUsersChanged;

        public Task Send(string message)
        {
            return this.Clients.All.SendAsync("Send", message, this._userService.Users[Context.ConnectionId]);
        }

        public async Task GetConnectedUsers()
        {
            var connectedUsers = this._userService.Users.Where(x => x.Key != Context.ConnectionId).Select(x => x.Value).ToList();
            await this.Clients.Client(Context.ConnectionId).SendAsync("GetConnectedUsers", connectedUsers);
        }

        public override async Task OnConnectedAsync()
        {
            if (this._userService.Users.Keys.Contains(Context.ConnectionId))
            {
                return;
            }

            this._userService.Users[Context.ConnectionId] = "an0n #" + this._userService.Users.Count;
            await this.Clients.All.SendAsync("NewUser", this._userService.Users[Context.ConnectionId]);
            await this.Clients.Client(Context.ConnectionId).SendAsync("HubLoaded");
            //this.OnUsersChanged?.Invoke(this, new EventArgs());
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await this.Clients.All.SendAsync("UserLeft", this._userService.Users[Context.ConnectionId]);
            this._userService.Users.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
