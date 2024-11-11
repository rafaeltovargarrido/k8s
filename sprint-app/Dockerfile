# Use an official Maven image to build the app
FROM maven:3.8.5-openjdk-17 AS build
LABEL org.opencontainers.image.source="https://github.com/rafaeltovargarrido/k8s"

# Set the working directory for the build
WORKDIR /app

# Copy the pom.xml and source code into the container
COPY pom.xml .
COPY src ./src

# Run the Maven build to generate the JAR file
RUN mvn clean install -DskipTests

# Use a smaller OpenJDK image for the final stage
FROM openjdk:17-jdk-alpine

# Set the label for the source code repository
LABEL org.opencontainers.image.source="https://github.com/rafaeltovargarrido/k8s"


# Set the working directory in the container
WORKDIR /app

# Copy the generated JAR file from the build stage
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 (default for Spring Boot)
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
