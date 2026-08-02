using EngineeringLogs.Api.DTOs.Auth;
using EngineeringLogs.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EngineeringLogs.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IJwtService _jwtService;

        public AuthController(
            IConfiguration configuration,
            IJwtService jwtService)
        {
            _configuration = configuration;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequestDto request)
        {
            var storedUsername = _configuration["Admin:Username"];
            var storedPasswordHash = _configuration["Admin:PasswordHash"];

            if (request.Username != storedUsername)
            {
                return Unauthorized("Invalid username or password.");
            }

            var hasher = new PasswordHasher<object>();

            var result = hasher.VerifyHashedPassword(
                null!,
                storedPasswordHash!,
                request.Password
            );
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Invalid username or password.");
            }
            var token = _jwtService.GenerateToken(request.Username);

            return Ok(new LoginResponseDto
            {
                Token = token
            });
        }
    }
}
