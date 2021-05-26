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

# enable HTML5 history mode in vue-router via "404.html hack"
# https://stackoverflow.com/questions/47677220/vuejs-history-mode-with-github-gitlab-pages
mv index.html 404.html

# get output dir ready to push via git
git init
git add -A
git commit -m 'deploy'

# local branch is master or main?
branch=$(git branch --show-current)

# push "dist repo" main branch to main project remote gh-pages branch
git push --force "$remote" "$branch":gh-pages

cd -