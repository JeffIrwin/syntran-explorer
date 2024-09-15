#!/usr/bin/env bash

set -exu

mkdir -p scratch/temp-download
pushd    scratch/temp-download

curl -LO "https://github.com/JeffIrwin/syntran/releases/latest/download/syntran-linux.zip"
#curl -LO "https://github.com/JeffIrwin/syntran/releases/download/0.0.51/syntran-linux.zip"

unzip -o syntran-linux.zip
chmod +x ./syntran
#./syntran --version
sudo cp ./syntran /usr/local/bin/syntran
syntran --version

popd

