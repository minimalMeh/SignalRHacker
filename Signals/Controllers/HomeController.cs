using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Signals.Models;
using Signals.Services;

namespace Signals.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly Hub _hub;

        [BindProperty]
        public int SelectedTag { get; set; }
        public SelectList TagOptions { get; set; }


        public HomeController(ILogger<HomeController> logger, Hub hub)
        {
            _logger = logger;
            _hub = hub;
        }

        public IActionResult Index()
        {
            this.ViewBag.Users = (this._hub as ChatHub).Users;
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
