using MVCAlquilerAutos.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();


builder.Services.AddHttpClient<MVCAlquilerAutos.Services.IAlquilerService, MVCAlquilerAutos.Services.AlquilerService>(client =>
{
    client.BaseAddress = new Uri("https://localhost:51366/"); // Cambiá esto por la URL real de tu API
});


builder.Services.AddHttpClient<IUsuarioService, UsuarioService>(client =>
{
    client.BaseAddress = new Uri("https://localhost:51366/"); // Cambiá esto por la URL real de tu API
});


var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();
