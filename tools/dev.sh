#!/bin/bash

# Exit when any command fail
set -eo pipefail

yarn cleanup
yarn install
next -p 3000
