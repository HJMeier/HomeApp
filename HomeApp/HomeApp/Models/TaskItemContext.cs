using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HomeApp.Models
{
    public class TaskItemContext : DbContext
    {
        public TaskItemContext (DbContextOptions<TaskItemContext> options)
            : base(options)
        {
        }

        public DbSet<HomeApp.Models.TaskItem> TaskItem { get; set; }
    }
}
