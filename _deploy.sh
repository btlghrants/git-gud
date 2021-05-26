#!/usr/bin/env sh

# https://cli.vuejs.org/guide/deployment.html#github-pages

# abort on errors
set -e

# build
npm run build

# figure out remote to push to
remote=$(git remote -v | grep '(push)' | awk '{print $2}')

# navigate into the build output directory
cd dist

# get output dir ready to push via git
git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

# push "dist repo" main branch to main project remote gh-pages branch
git push --force "$remote" main:gh-pages

cd -