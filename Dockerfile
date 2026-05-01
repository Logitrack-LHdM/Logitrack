# 1. Usar Java 17 (o la versión que usen en la facu)
FROM openjdk:17-jdk-slim

# 2. Copiar el archivo .jar que genera Maven al servidor
COPY target/*.jar app.jar

# 3. Abrir el puerto que usa Render (generalmente 8080)
EXPOSE 8080

# 4. El comando para arrancar la aplicación
ENTRYPOINT ["java","-jar","/app.jar"]
