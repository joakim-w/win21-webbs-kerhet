using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(x =>
{
    x.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });

    x.AddPolicy("react", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://win21.azurewebsites.net");
        policy.WithMethods("POST", "GET", "PUT", "DELETE");
        policy.WithHeaders(HeaderNames.ContentType, "x-custom-header");
    });

    x.AddPolicy("liveserver", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500");
        policy.WithMethods("POST", "GET", "PUT", "DELETE");
        policy.WithHeaders(HeaderNames.ContentType, "x-custom-header");
    });

});


var app = builder.Build();

app.UseCors();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
