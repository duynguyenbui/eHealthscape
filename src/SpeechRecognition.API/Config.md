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
  "OpenApi": {
    "Endpoint": {
      "Name": "SpeechRecognition.API V1"
    },
    "Document": {
      "Description": "The Speech Recognition Service HTTP API. This is a Data-Driven/CRUD microservice sample",
      "Title": "eHealthscape - Speech Recognition HTTP API",
      "Version": "v1"
    }
  },
  "Auth": {
    "ClientId": "speechswaggerui",
    "AppName": "Speech Swagger UI"
  },
  "Identity": {
    "Audience": "speech",
    "Scopes": {
      "speech": "Speech Recognition API"
    }
  },
  "AI": {
    "OpenAI": {
      "BaseUrl": "http://localhost:1234/v1",
      "ApiKey": "lm-studio",
      "ModelName": "lmstudio-ai/gemma-2b-it-GGUF/gemma-2b-it-q8_0.gguf"
    }
  }
}
```
**appsettings.Development.json**
```json
{
  "ConnectionStrings": {
    "Redis": "localhost"
  },
  "Identity": {
    "Url": "https://localhost:5001"
  }
}
```