# lywsd02-clock-updater

A simple script to update the clock of a Xiaomi LYWSD02 e-ink clock / thermometer.

## Running with Docker

Change the TZ environment variable to your timezone, e.g. `Europe/Berlin` or `America/New_York`.

```bash
docker run -it --rm --network host --env TZ=UTC ghcr.io/lpgera/lywsd02-clock-updater
```

## Docker Compose

```yaml
services:
  lywsd02-clock-updater:
    image: ghcr.io/lpgera/lywsd02-clock-updater
    network_mode: host
    environment:
      - TZ=UTC # Set your timezone, e.g. Europe/Berlin or America/New_York
```
