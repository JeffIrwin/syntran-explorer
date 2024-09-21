#!/usr/bin/env bash

# Update everything on the prod server and (re)start it

set -exu
#set -ex

git pull

# This can have a cold-start problem, so the rest of the important stuff is in a
# wrapped script after the git pull
./wrapped-deploy.sh

