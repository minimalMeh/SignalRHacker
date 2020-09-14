using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Signals.Services
{
    public class ChatHub : Hub
    {
        public Task Send(string message)
        {
            return this.Clients.All.SendAsync("Send", message);
        }
    }
}
