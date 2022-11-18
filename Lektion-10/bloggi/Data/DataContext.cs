using bloggi.Models;
using Microsoft.EntityFrameworkCore;

namespace bloggi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<PostEntity> Posts { get; set; }
    }
}
