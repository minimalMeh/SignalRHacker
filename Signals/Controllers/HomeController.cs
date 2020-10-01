using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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

        [BindProperty]
        public int SelectedTag { get; set; }
        public SelectList TagOptions { get; set; }


        public HomeController(ILogger<HomeController> logger, IHubContext<ChatHub> hub, IUserService userService)
        {
            _logger = logger;
            _hub = hub;
            _userService = userService;
            _userService.UsersCountChanged += OnUsersChanged;
        }

        private void OnUsersChanged(object sender, EventArgs e)
        {
            this.ViewBag.Users = this._userService.Users.Select(i => i.Value);
        }

        public IActionResult Index()
        {
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
