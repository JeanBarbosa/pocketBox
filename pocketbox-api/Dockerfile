# Stage 1: Build the application
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:18

WORKDIR /app
COPY --from=build /app ./
CMD ["npm", "run", "start:dev"]