using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeApp.Models;
using HomeApp.Data;

namespace HomeApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemsController : ControllerBase
    {
        private readonly TaskItemContext _context;
        private readonly IDataRepository<TaskItem> _repo;

        public TaskItemsController(TaskItemContext context, IDataRepository<TaskItem> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/TaskItem
        [HttpGet]
        public IEnumerable<TaskItem> GetTaskItem()
        {
            return _context.TaskItem.OrderByDescending(p => p.TaskId);
        }

        // GET: api/TaskItem/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var taskItem = await _context.TaskItem.FindAsync(id);

            if (taskItem == null)
            {
                return NotFound();
            }

            return Ok(taskItem);
        }

        // PUT: api/TaskItem/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem([FromRoute] int id, [FromBody] TaskItem taskItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != taskItem.TaskId)
            {
                return BadRequest();
            }

            _context.Entry(taskItem).State = EntityState.Modified;

            try
            {
                _repo.Update(taskItem);
                var save = await _repo.SaveAsync(taskItem);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TaskItem
        [HttpPost]
        public async Task<IActionResult> PostTaskItem([FromBody] TaskItem taskItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(taskItem);
            var save = await _repo.SaveAsync(taskItem);

            return CreatedAtAction("GetBlogPost", new { id = taskItem.TaskId }, taskItem);
        }

        // DELETE: api/TaskItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var taskItem = await _context.TaskItem.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }

            _repo.Delete(taskItem);
            var save = await _repo.SaveAsync(taskItem);

            return Ok(taskItem);
        }

        private bool TaskItemExists(int id)
        {
            return _context.TaskItem.Any(e => e.TaskId == id);
        }
    }
}
