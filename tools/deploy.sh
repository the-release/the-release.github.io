#!/bin/bash

# Exit when any command fail
set -eo pipefail

yarn cleanup
yarn install
yarn build
touch dist/out/.nojekyll
echo 'thefollower.news' > dist/out/CNAME
git add dist/* -f
git commit -m "Release at $(date)"
git subtree push --prefix dist/out origin master
