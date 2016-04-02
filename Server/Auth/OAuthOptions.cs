using Chloe.Server.Config;
using Chloe.Server.Config.Contracts;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chloe.Server.Auth
{
    public class OAuthOptions : OAuthAuthorizationServerOptions
    {
        public OAuthOptions(IConfigurationProvider configurationProvider, Chloe.Server.Services.Contracts.IIdentityService identityService)
        {
            var config = configurationProvider.Get<IAuthConfiguration>();

            TokenEndpointPath = new PathString(config.TokenPath);
            AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(config.ExpirationMinutes);
            AccessTokenFormat = new JwtWriterFormat(configurationProvider, this);
            Provider = new OAuthProvider(identityService);
            AllowInsecureHttp = true;
        }

    }
}