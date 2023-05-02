using System.Reflection;
using Microsoft.EntityFrameworkCore;
using QuoteJourney.API.Data.Entities;

namespace QuoteJourney.API.Data;

public sealed class QuoteJourneyDbContext : DbContext
{
    public QuoteJourneyDbContext(DbContextOptions<QuoteJourneyDbContext> options) : base(options)
    {
    }

    public DbSet<Quote> Quotes { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
