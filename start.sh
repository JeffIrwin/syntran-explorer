#!/usr/bin/env bash

#set -exu
set -ex

# TODO: proper arg parsing
export NODE_ENV=production
if [[ "$1" == "--stg" ]] ; then
	export NODE_ENV=staging
fi

node server.js

