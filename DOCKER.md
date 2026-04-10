# 🐳 Docker Configuration for Tu Tiên ITSM Dashboard

## Build Image

```bash
docker build -t tu-tien-dashboard .
```

## Run Container

```bash
docker run -p 3000:3000 tu-tien-dashboard
```

## Run with Environment Variables

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e DEBUG_MODE=false \
  tu-tien-dashboard
```

## Development Mode

```bash
docker-compose up --build
```
