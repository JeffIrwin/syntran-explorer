#!/usr/bin/env bash

set -exu
#set -ex

./build.sh

pushd src

#pkill node || true
##nohup node server.js &
#setsid nohup node server.js &

# There's `pm2 restart` but it fails if you haven't already started :(
#
# If you ever start pm2 without prod env, you have to `pm2 kill` and restart to
# reset the env
NODE_ENV="production" pm2 stop server.js || true
NODE_ENV="production" pm2 start server.js

