FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Mobile.Bff/Mobile.Bff.csproj", "src/Mobile.Bff/"]
RUN dotnet restore "src/Mobile.Bff/Mobile.Bff.csproj"
COPY . .
WORKDIR "/src/src/Mobile.Bff"
RUN dotnet build "Mobile.Bff.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Mobile.Bff.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mobile.Bff.dll"]
