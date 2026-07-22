using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace EngineeringLogs.Api.Data;

public class EngineeringLogsDbContextFactory
    : IDesignTimeDbContextFactory<EngineeringLogsDbContext>
{
    public EngineeringLogsDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<EngineeringLogsDbContext>();

        optionsBuilder.UseNpgsql(
            "Host=localhost;Port=5432;Database=EngineeringLogs;Username=postgres;Password=b1d97fpostgresqladmin");

        return new EngineeringLogsDbContext(optionsBuilder.Options);
    }
}