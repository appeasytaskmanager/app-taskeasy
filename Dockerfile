#
# Multi-stage Dockerfile para Next.js (dev e produção)
#

# ---------- Base ----------
FROM node:20-alpine AS base
ENV NODE_ENV=production
WORKDIR /app

# ---------- Dependências (cache isolado) ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- Build (produção) ----------
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build standalone para produção
RUN npm run build

# ---------- Produção (runtime) ----------
FROM node:20-alpine AS production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
# Copia apenas o necessário para rodar em modo standalone
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]

# ---------- Desenvolvimento ----------
# Mantemos um estágio separado para dev, utilizado pelo docker-compose
FROM node:20-alpine AS dev
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
# Habilita hot reload (Next dev)
CMD ["npm", "run", "dev"]


