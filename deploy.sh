#!/usr/bin/env bash

set -exu
#set -ex

git pull
export NODE_ENV="production"
pkill node || true

#nohup node server.js &
setsid nohup node server.js &

