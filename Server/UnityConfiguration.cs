using Chloe.Server.Behaviors;
using Chloe.Server.Config;
using Chloe.Server.Config.Contracts;
using Chloe.Server.Data;
using Chloe.Server.Data.Contracts;
using Chloe.Server.Services;
using Chloe.Server.Services.Contracts;
using Chloe.Server.Utils;
using Chloe.Server.Utils.Contracts;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.InterceptionExtension;

namespace Chloe.Server
{
    public class UnityConfiguration
    {
        public static IUnityContainer GetContainer(bool useMock = false)
        {
            var container = new UnityContainer()
                .AddNewExtension<Interception>();

            container.RegisterType<IChloeUow, ChloeUow>();
            container.RegisterType<IDbContext, ChloeContext>();
            container.RegisterType<IRepositoryProvider, RepositoryProvider>();
            container.RegisterType<IEncryptionService, EncryptionService>();
            container.RegisterType<IIdentityService, IdentityService>();
            container.RegisterType<ICacheProvider, CacheProvider>();
            container.RegisterType<IConfigurationProvider,ConfigurationProvider>();            
            container.RegisterType<ILogger, Logger>();

            container.RegisterType<IUserService, UserService>(new HierarchicalLifetimeManager(),
                new Interceptor<InterfaceInterceptor>(),
                new InterceptionBehavior<LoggingInterceptionBehavior>());

            return container;
        }
    }
}