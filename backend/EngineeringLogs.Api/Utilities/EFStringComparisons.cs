using System;

namespace EngineeringLogs.Api.Utilities
{
    public static class EFStringComparisons
    {
        // Normalize input string once on the client side using invariant culture
        public static string? NormalizeForComparison(string? input)
        {
            return input is null ? null : input.ToLowerInvariant();
        }
    }
}
