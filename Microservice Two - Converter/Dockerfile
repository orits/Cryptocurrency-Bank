FROM java:8

EXPOSE 9090

ADD target/docker-coin-conversion-service.jar docker-coin-conversion-service.jar

ENTRYPOINT ["java","-jar","/docker-coin-conversion-service.jar"]