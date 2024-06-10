If you want to include the commented sections (`Auth`, `Identity`, `AI`) in the future, you will need to ensure they are correctly formatted and uncommented like this:

**appsettings.json**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "Database": "Host=localhost;Port=5432;Database=HealthRecordDB;Username=postgres;Password=postgrespw",
    "Redis": "localhost:5540"
  },
  "OpenApi": {
    "Endpoint": {
      "Name": "HealthRecord.API V1"
    },
    "Document": {
      "Description": "The Health Record Service HTTP API. This is a Data-Driven/CRUD microservice sample",
      "Title": "eHealthscape - Health Record HTTP API",
      "Version": "v1"
    },
    "Auth": {
      "ClientId": "healthrecordsswaggerui",
      "AppName": "HealthRecord Swagger UI"
    }
  },
  "Identity": {
    "Audience": "healthrecords",
    "Scopes": {
      "healthrecords": "HealthRecord API"
    }
  }
}
```
**appsettings.Development.json**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "Identity": {
    "Url": "https://localhost:5001"
  }
}
```