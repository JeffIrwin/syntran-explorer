#!/usr/bin/env bash

set -exu
#set -ex

git pull
export NODE_ENV="production"

#pkill node || true
##nohup node server.js &
#setsid nohup node server.js &

pm2 stop server.js || true
pm2 start server.js

