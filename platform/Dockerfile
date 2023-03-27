FROM gradle:7.6.1-jdk17-alpine AS BUILD_IMAGE
ENV APP_HOME=/usr/api/
WORKDIR $APP_HOME
COPY build.gradle settings.gradle $APP_HOME  
COPY gradle $APP_HOME/gradle/
COPY --chown=gradle:gradle . /home/gradle/src
COPY . .
RUN gradle build || return 0

FROM amazoncorretto:17
ENV ARTIFACT_NAME=platform-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/usr/api
WORKDIR $APP_HOME
COPY --from=BUILD_IMAGE $APP_HOME/build/libs/$ARTIFACT_NAME .
EXPOSE 8081
CMD ["java", "-jar", $ARTIFACT_NAME]