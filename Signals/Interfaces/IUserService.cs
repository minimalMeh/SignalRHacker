﻿using System.Collections.Generic;

namespace Signals.Interfaces
{
    public interface IUserService
    {
        IDictionary<string, string> Users { get; }
    }
}