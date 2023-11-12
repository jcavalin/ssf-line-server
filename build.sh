#!/bin/bash

if ! type "node" > /dev/null; then
    echo "node not found"
    exit;
fi

npm install

echo "Finished!"