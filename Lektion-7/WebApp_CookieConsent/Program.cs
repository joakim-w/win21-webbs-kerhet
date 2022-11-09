var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.Configure<CookiePolicyOptions>(x =>
{
    x.CheckConsentNeeded = context => true;
    x.MinimumSameSitePolicy = SameSiteMode.None;

});



var app = builder.Build();



app.UseExceptionHandler("/Home/Error");
app.UseHsts();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCookiePolicy();

app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
