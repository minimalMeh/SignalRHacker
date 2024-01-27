using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Signals.Interfaces;
using Signals.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace Signals.Controllers
{
    public class HomeController : Controller
    {
        private readonly IUserService _userService;

        public HomeController(IUserService userService)
        {
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

            var usersViewModel = new UsersViewModel
            {
                Users = new List<SelectListItem>(_userService.Users.Select(i =>
                    new SelectListItem
                    {
                        Value = i.Key,
                        Text = i.Value
                    }))
            };

            return usersViewModel;
        }

        public IActionResult Index()
        {
            OnUsersChanged(_userService, null);
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
