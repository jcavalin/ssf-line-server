#!/bin/bash

if npm run process-file $1; then
    npm run start
fi