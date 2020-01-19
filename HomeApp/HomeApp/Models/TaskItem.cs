using System;
using System.ComponentModel.DataAnnotations;

namespace HomeApp.Models
{
    public class TaskItem
        //any changes to data model -> Packet Manager Console: Add-Migration YourMigration Name and Update-Database
    {
        [Key]
        public int TaskId { get; set; }

        [Required]
        public string TaskTitle { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public DateTime DoneDate { get; set; }

        [Required]
        public int State { get; set; }

        [Required]
        public int SeriesType { get; set; }
    }
}
