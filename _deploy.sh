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

# configure server-side redirect for GitHub Pages "404 hack"
# https://www.smashingmagazine.com/2016/08/sghpa-single-page-app-hack-github-pages/
repo_name=$(echo "$remote" | awk -F '/' '{print $(NF)}' | sed 's/.git//')
sed -i'' "s/||REPO_NAME||/$repo_name/" ./404.html

# get output dir ready to push via git
git init
git add -A
git commit -m 'deploy'

# local branch is master or main?
branch=$(git branch --show-current)

# push "dist repo" main branch to main project remote gh-pages branch
git push --force "$remote" "$branch":gh-pages

cd -