#!/bin/sh

npm install --global yarn
npm install
npm run build
yarn global add serve

serve -s build
