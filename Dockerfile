# Usa la imagen oficial de Node.js como imagen base
FROM node:latest

# Establece el directorio de trabajo
WORKDIR /usr/src/app

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