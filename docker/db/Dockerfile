FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=hostel_db
COPY hostel_db.sql /docker-entrypoint-initdb.d/
