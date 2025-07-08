using MVCAlquilerAutos.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// ?? Registro del servicio HTTP para AlquilerService
builder.Services.AddHttpClient<MVCAlquilerAutos.Services.IAlquilerService, MVCAlquilerAutos.Services.AlquilerService>();
builder.Services.AddHttpClient<MVCAlquilerAutos.Services.IUsuarioService, MVCAlquilerAutos.Services.UsuarioService>(client =>
{
    client.BaseAddress = new Uri("https://localhost:51055"); // o el puerto real de tu API
});
builder.Services.AddHttpClient<IVehiculoService, VehiculoService>(client =>
{
    client.BaseAddress = new Uri("https://localhost:51055");
});
var app = builder.Build();

// Configure the HTTP request pipeline.
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
