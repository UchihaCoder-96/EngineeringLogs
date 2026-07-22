using EngineeringLogs.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace EngineeringLogs.Api.Data
{
    public class EngineeringLogsDbContext : DbContext
    {
        public EngineeringLogsDbContext(DbContextOptions<EngineeringLogsDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects => Set<Project>();

        public DbSet<Journal> Journals => Set<Journal>();
    }
}
