#!/usr/bin/env bash

set -exu

npm install
npx rollup editor.js -f iife -o public/3p/cm6.bundle2.js -p @rollup/plugin-node-resolve --output.name cm6

# uglifyjs works
#
# i first tried `npx minify` and `jsmin` but they both failed.  not sure if
# the minifiers are broken or rollup is broken or the source js is just broken
./node_modules/.bin/uglifyjs public/3p/cm6.bundle2.js -o public/3p/cm6.bundle2.min.js

