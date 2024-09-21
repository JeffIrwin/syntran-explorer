#!/usr/bin/env bash

set -exu

npm install

dir="public/3p"
mkdir -p "$dir"
npx rollup editor.js -f iife -o "$dir"/cm6.bundle.js -p @rollup/plugin-node-resolve --output.name cm6

# uglifyjs works
#
# i first tried `npx minify` and `jsmin` but they both failed.  not sure if
# the minifiers are broken or rollup is broken or the source js is just broken
./node_modules/.bin/uglifyjs "$dir"/cm6.bundle.js -o "$dir"/cm6.bundle.min.js

