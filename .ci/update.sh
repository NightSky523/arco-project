#!/bin/sh

set -e

git pull
yarn

rm -rf .ci/cache
git clone ./ .ci/cache

FILE=.env.local
if test -f "$FILE"; then
    cp $FILE .ci/cache
fi

yarn build .ci/cache

rm -rf dist
mv .ci/cache/dist dist
