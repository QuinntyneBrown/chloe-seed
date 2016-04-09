﻿using System.Collections.Generic;

namespace Chloe.Server.Models
{
    public class User: BaseEntity
    {        
        public string Password { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public ICollection<Role> Roles { get; set; } = new HashSet<Role>();
    }
}