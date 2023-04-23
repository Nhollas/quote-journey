FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["QuoteJourney.API.csproj", "./"]
RUN dotnet restore "QuoteJourney.API.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "QuoteJourney.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "QuoteJourney.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "QuoteJourney.API.dll"]
