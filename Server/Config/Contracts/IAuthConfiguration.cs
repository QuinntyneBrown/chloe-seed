namespace Chloe.Server.Config.Contracts
{
    public interface IAuthConfiguration
    {
        string TokenPath { get; set; }
        int ExpirationMinutes { get; set; }
        string JwtKey { get; set; }
        string JwtAudience { get; set; }
        string JwtIssuer { get; set; }
    }
}
