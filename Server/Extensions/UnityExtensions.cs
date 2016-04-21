using Chloe.Server.Behaviors;
using Chloe.Server.Services;
using Chloe.Server.Services.Contracts;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.InterceptionExtension;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chloe.Server.Extensions
{
    public static class UnityExtensions
    {
        public static void RegisterTypeWithLogging<TTo, TFrom>(this IUnityContainer container)
            where TTo : TFrom
        {

            container.RegisterType<typeof(IUserService), UserService>(new HierarchicalLifetimeManager(),
                new Interceptor<InterfaceInterceptor>(),
                new InterceptionBehavior<LoggingInterceptionBehavior>());
        }
    }
}