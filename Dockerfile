# Usa la imagen oficial de Node.js como imagen base
FROM node:latest

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Define los argumentos de construcción
ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE
ARG JWT_SECRET
ARG DATABASE_URL

# Establece las variables de entorno
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_DATABASE=${DB_DATABASE}
ENV JWT_SECRET=${JWT_SECRET}
ENV DATABASE_URL=${DATABASE_URL}

# Copia el archivo package.json y el package-lock.json
COPY package*.json ./

# Instala Bun
RUN curl -fsSL https://bun.sh/install | bash

# Añade Bun al PATH
ENV PATH="/root/.bun/bin:$PATH"

# Instala las dependencias de la aplicación
RUN bun install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación NestJS
RUN bun run build

# Expone el puerto 
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["bun", "run", "start:prod"]