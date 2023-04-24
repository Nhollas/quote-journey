using QuoteJourney.API.Data.Entities;

namespace QuoteJourney.API.Interfaces;

public interface IQuoteService
{
    public Task<Quote?> GetQuoteAsync(Guid id);
    public Task<Quote> CreateQuoteAsync();
    public Task DeleteQuoteAsync(Guid id);
}