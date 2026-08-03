using Microsoft.AspNetCore.Routing.Constraints;

namespace EngineeringLogs.Api.Utilities
{
    public static class EnvVar
    {
        public static string ConnectionString { get; set; } = string.Empty;
    }
}
