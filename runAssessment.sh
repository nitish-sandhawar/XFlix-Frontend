# setup for pnpm to pickup npm in script
 shopt -s expand_aliases
 . ~/.bash_aliases

# Override baseUrl in cypress.json
# https://docs.cypress.io/guides/references/configuration.html#Environment-Variables
export CYPRESS_BASE_URL=http://localhost:8081

REACT_PORT=8081
PROJECT_DIR="$PWD"
REACT_DIR="$PROJECT_DIR/frontend"

# exit on non-zero return code
set -e

# kill descendants on exit
# https://stackoverflow.com/a/2173421
# trap "echo 'Cleaning up resources' && trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT


# 1. Start React app
if [ ! -d "$REACT_DIR" ]; then
  echo "Can't find $REACT_DIR directory"
  exit 1
fi

# Alternatively kill any process running on the required port
# lsof -ti tcp:$REACT_PORT | xargs kill

if netstat -tna | grep 'LISTEN\>' | grep -q $REACT_PORT; 
then
  lsof -ti tcp:$REACT_PORT | xargs kill
  echo "Killed application running on $REACT_PORT"
fi

cd $PROJECT_DIR/frontend && npm install && pm2 start npm -- start

while ! netstat -tna | grep 'LISTEN\>' | grep -q $REACT_PORT; do
  echo "waiting for React application to start on port $REACT_PORT"
  sleep 5 # time in seconds, tune it as needed
done

# 2. Run assessment
cd $PROJECT_DIR/assessment && npm install && npm run test || true

cd $PROJECT_DIR/frontend && pm2 stop npm
