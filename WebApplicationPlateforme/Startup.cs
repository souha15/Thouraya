using Hangfire;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System;
using Hangfire;
using Hangfire.MemoryStorage;
using System.IO;
using System.Text;
using WebApplicationPlateforme.Data;
using WebApplicationPlateforme.Hubs;
using WebApplicationPlateforme.Model.User;
using Microsoft.AspNetCore.SignalR;
using WebApplicationPlateforme.EmailSender;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Http;
using System.Security.Principal;
using Newtonsoft.Json;

namespace WebApplicationPlateforme
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<SmtpClient>((serviceProvider) =>
            {
                var config = serviceProvider.GetRequiredService<IConfiguration>();
                return new SmtpClient()
                {
                    Host = config.GetValue<String>("Email:Smtp:Host"),
                    Port = config.GetValue<int>("Email:Smtp:Port"),
                    Credentials = new NetworkCredential(
                            config.GetValue<String>("Email:Smtp:Username"),
                            config.GetValue<String>("Email:Smtp:Password")
                        )
                };
            });
            //Inject Hangfire
            /*  services.AddHangfire(config =>
              config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
              .UseSimpleAssemblyNameTypeSerializer()
              .UseDefaultTypeSerializer()
              .UseMemoryStorage()
              );

              services.AddHangfireServer();*/
            //Inject AppSettings

            //get Ip Address
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddSingleton<IUserIdProvider, EmailBasedUserIdProvider>();

            services.Configure<ApplicationSettings>(Configuration.GetSection("ApplicationSettings"));



            services.AddEntityFrameworkNpgsql()
                .AddDbContext<ApplicationDbContext>(
                options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddEntityFrameworkNpgsql()
               .AddDbContext<FinanceContext>(
               options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddEntityFrameworkNpgsql()
   .AddDbContext<DawaaContext>(
   options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddEntityFrameworkNpgsql()
       .AddDbContext<NotificationContext>(
       options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));


            services.AddEntityFrameworkNpgsql()
      .AddDbContext<AdministrativeCommunicationContext>(
      options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
            /* services.AddDefaultIdentity<ApplicationUser>()
                 .AddEntityFrameworkStores<ApplicationDbContext>();
                 */
            services.AddIdentityCore<ApplicationUser>()
                .AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>()
           .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
            }
           );


            services.AddCors();
            /*services.Configure<SmtpSettings>(Configuration.GetSection("SmtpSettings"));
            services.AddSingleton<IMailer, Mailer>();*/

            services.AddSignalR(o =>
            {
                o.EnableDetailedErrors = true;
            });
            services.AddHttpContextAccessor();
            services.AddTransient<IPrincipal>(provider => provider.GetService<IHttpContextAccessor>().HttpContext.User);
            //services.AddSingleton<IUserIdProvider, EmailBasedUserIdProvider>();
        
            services.AddMvc()
                
                .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_3_0).AddNewtonsoftJson(o =>
                {
                    o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

            //services.AddControllersWithViews();
            services.AddControllers()
            .AddNewtonsoftJson();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            // JWT Authentification

            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_Secret"].ToString());

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x => {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero

                };
            });

            services.Configure<IISServerOptions>(options =>
            {
                options.AutomaticAuthentication = false;
            });

            services.Configure<IISOptions>(options =>
            {
                options.ForwardClientCertificate = false;
            });

        
          //  services.AddSignalR();

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            //Path for files 

            if (string.IsNullOrWhiteSpace(env.WebRootPath)) env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");



            //app.UseHangfireDashboard();

           /* backgroundJobClient.Enqueue(() => Console.WriteLine("hello Hanfire Job"));

            recurringJobManager.AddOrUpdate("Run every minute", () => Console.WriteLine("test reccuring job"), "* * * * *");*/
            //Cron.Monthly
            app.UseForwardedHeaders();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseHttpsRedirection();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // app.UseHttpsRedirection();
            // app.UseDefaultFiles();
            //app.UseStaticFiles();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = new TimeSpan(0, 0, 80);
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotifyHub>("Notify");
            });
            app.UseWebSockets();
            app.UseCors(builder =>

                builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
                //.AllowCredentials()
            );
            app.UseAuthentication();

           /* app.UseSignalR(routes =>
            {
                routes.MapHub<NotifyHub>("/notify");
            });*/

           

            //app.UseMvc();

            /*   app.UseSignalR(options =>
               {
                   options.MapHub<MessageHub>("/MessageHub");
               });

       */
        }
    }
}
