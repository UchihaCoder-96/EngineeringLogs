namespace EngineeringLogs.Api.Services
{
    public interface IJwtService
    {
        string GenerateToken(string username);
    }
}
