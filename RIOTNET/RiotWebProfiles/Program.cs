using RiotWebProfiles.Services;

var builder = WebApplication.CreateBuilder(args);   //load webpage builder
builder.Services.AddScoped<RiotService>();
builder.Services.AddControllers();                  //manage endpoints based on controllers
builder.Services.AddHttpClient<RiotService>();

//allows backend to receive petitions from angular (front)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200") // URL donde corre Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();                          //builds the app
app.UseCors();
app.UseHttpsRedirection();                          //autoredirects HTTP to HTTPS to ensure security      

app.MapControllers();                               //enables endpoints defined on controllers to respond the requests
app.Run();                                          //starts de app