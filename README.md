# Discord Bot
Simple Discord Bot powered by [discord.js](https://discord.js.org/)

## Features
This bot has two features:

1. Making sure all members names end with a configurable postfix.
2. Making sure all members are given a specific role configurable by name.

## Configuration
The bot requires a `settings.json` file in the project root. The file should have the following values set:

```jsonc
{
    "clientId": "<BotClientId>",
    "token": "<BotToken>",
    "namePostfix": "™", // Example value. Can be any string
    "roleName": "<YourRole>" // Can be the display name of any role on the server 
}
```

### Manual Installation
#### Dependencies
- Node.js 22.12.0 or newer

#### Building & Deploying Manually
TODO

### Using Docker
#### Dependencies
- Docker 25.0 or newer

#### Building the Image
Run the following in the project dir:

```shell
docker build -t <image-name> .
```

#### Deploying
```shell
docker run -d --restart unless-stopped --name <container-name> <image-name>:latest
```

