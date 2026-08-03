using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace EngineeringLogs.Api.Data;

public class EngineeringLogsDbContextFactory
    : IDesignTimeDbContextFactory<EngineeringLogsDbContext>
{
    public EngineeringLogsDbContext CreateDbContext(string[] args)
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .AddUserSecrets<Program>(optional: true)
            .AddEnvironmentVariables()
            .Build();

        var connectionString =
            configuration.GetConnectionString("DefaultConnection");

        var optionsBuilder = new DbContextOptionsBuilder<EngineeringLogsDbContext>();

        optionsBuilder.UseNpgsql(connectionString);

        return new EngineeringLogsDbContext(optionsBuilder.Options);
    }
}