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
        private readonly IUserService userService;

        public ChatHub(IUserService userService) : base()
        {
            this.userService = userService;
        }

        public Task Send(string message)
        {
            return Clients.All.SendAsync("Send", message, userService.Users[Context.ConnectionId]);
        }

        public Task GetConnectedUsers()
        {
            var connectedUsers = userService.Users.Where(x => x.Key != Context.ConnectionId).Select(x => x.Value).ToList();
            return Clients.Client(Context.ConnectionId).SendAsync("GetConnectedUsers", connectedUsers);
        }

        public async Task ReportUser(List<string> items)
        {
            var clientId = items[0].Replace("\"", "");
            var reportedWhyMessage = items[1].Replace("\"", "");
            await Clients.Client(clientId).SendAsync("ReportUser", reportedWhyMessage);
        }

        public override async Task OnConnectedAsync()
        {
            if (userService.Users.Keys.Contains(Context.ConnectionId))
            {
                return;
            }

            userService.Users[Context.ConnectionId] = "user #" + userService.Users.Count;
            await Clients.All.SendAsync("NewUser", userService.Users[Context.ConnectionId]);
            await Clients.Client(Context.ConnectionId).SendAsync("HubLoaded");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("UserLeft", userService.Users[Context.ConnectionId]);
            userService.Users.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
