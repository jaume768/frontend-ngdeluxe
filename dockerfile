# Dockerfile
# Usar una imagen de Node para construir la aplicación
FROM node:18 as build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos de construcción al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
