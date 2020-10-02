using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Signals.Interfaces;
using Signals.Models;
using Signals.Services;

namespace Signals.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<ChatHub> _hub;
        private readonly IUserService _userService;

        public HomeController(ILogger<HomeController> logger, IHubContext<ChatHub> hub, IUserService userService)
        {
            _logger = logger;
            _hub = hub;
            _userService = userService;
            _userService.UsersCountChanged += OnUsersChanged;
        }

        private void OnUsersChanged(object sender, EventArgs e)
        {
            UpdateUsers();
        }

        [HttpGet]
        public UsersViewModel UpdateUsers()
        {
            ModelState.Clear();
            var usersViewModel = new UsersViewModel();
            usersViewModel.Users =  new List<SelectListItem>(this._userService.Users.Select(i =>
            new SelectListItem
            {
                Value = i.Key,
                Text = i.Value
            }));
            return usersViewModel;
        }

        public IActionResult Index()
        {
            this.OnUsersChanged(this._userService, null);
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
