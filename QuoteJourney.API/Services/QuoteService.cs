using QuoteJourney.API.Data;
using QuoteJourney.API.Data.Entities;
using QuoteJourney.API.Interfaces;

namespace QuoteJourney.API.Services;

public class QuoteService : IQuoteService
{
    private readonly QuoteJourneyDbContext _context;

    public QuoteService(QuoteJourneyDbContext context)
    {
        _context = context;
    }
    
    public async Task<Quote?> GetQuoteAsync(Guid id)
    {
        return await _context.Quotes.FindAsync(id);
    }

    public async Task<Quote> CreateQuoteAsync()
    {
        var newQuote = new Quote()
        {
            Id = new Guid(),
            OwnerId = Guid.Empty
        };
        
        await _context.Quotes.AddAsync(newQuote);
        await _context.SaveChangesAsync();

        return newQuote;
    }

    public async Task DeleteQuoteAsync(Guid id)
    {
        var quoteToDelete = await _context.Quotes.FindAsync(id);
        
        _context.Quotes.Remove(quoteToDelete);
        await _context.SaveChangesAsync();
    }
}