set -e

SERVER="localhost";
PW="password";
DB="desafio-1sti";
USER="root";
PASS="password";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=$PW -e MYSQL_DATABASE=$DB -e MYSQL_USER=$USER -e MYSQL_PASSWORD=$PASS

# wait for pg to start
echo "Start [$SERVER]";