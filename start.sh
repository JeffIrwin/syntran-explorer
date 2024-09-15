#!/usr/bin/env bash

set -exu

export NODE_ENV=production
#export NODE_ENV=staging

node server.js

