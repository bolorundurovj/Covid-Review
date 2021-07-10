heroku create -a covidtracker-v2
heroku create -a covidtracker-v2-api
heroku buildpacks:add -a covidtracker-v2 heroku-community/multi-procfile
heroku buildpacks:add -a covidtracker-v2-api heroku-community/multi-procfile
heroku config:set -a covidtracker-v2 PROCFILE=frontend/Procfile
heroku config:set -a covidtracker-v2-api PROCFILE=backend/Procfile
git push https://git.heroku.com/covidtracker-v2.git HEAD:master
git push https://git.heroku.com/covidtracker-v2-api.git HEAD:master