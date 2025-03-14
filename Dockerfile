FROM oven/bun:latest
WORKDIR /app
COPY package.json .
COPY . .

ARG VITE_API_URL

RUN bun i --frozen-lockfile
RUN bun run build

FROM caddy:latest
COPY --from=0 /app/dist /usr/share/caddy
EXPOSE 80
