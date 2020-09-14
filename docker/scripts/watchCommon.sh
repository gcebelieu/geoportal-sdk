#!/bin/bash

# Initialisation 
old="0"

# Monitoring 
inotifywait -r -m -e modify -e create -e delete --timefmt '%Y-%m-%d %H:%M:%S' --format '%T %w %e' /home/docker/geoportal-sdk/src/ |
while read date time file event
do
  message=$date$time$file$event
  if [ $old != $message ]
  then 
    pushd /home/docker/geoportal-sdk/
    npm run build
    cp -rf ./dist/* /home/docker/html/geoportal-sdk/dist/
    cp -rf ./samples/* /home/docker/html/geoportal-sdk/samples/
    cp -rf ./jsdoc/* /home/docker/html/geoportal-sdk/jsdoc/
    popd
    pushd /home/docker/geoportal-sdk/scripts/release/
    rm -rf ./ignf-geoportal-sdk*.tgz
    bash build-pack.sh -a
    cp ./ignf-geoportal-sdk-2d*.tgz /home/docker/html/geoportal-sdk/package/ignf-geoportal-sdk-2d-local.tgz
    cp ./ignf-geoportal-sdk-3d*.tgz /home/docker/html/geoportal-sdk/package/ignf-geoportal-sdk-3d-local.tgz
    popd
    old=$message
  fi
done