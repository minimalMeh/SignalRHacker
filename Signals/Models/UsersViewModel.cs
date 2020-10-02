using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace Signals.Models
{
    public class UsersViewModel
    {
        public List<SelectListItem> Users { get; set; }
    }
}
