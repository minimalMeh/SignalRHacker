using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Signals.Models
{
    public class UsersViewModel
    {
        public List<SelectListItem> Users { get; set; }
    }
}
