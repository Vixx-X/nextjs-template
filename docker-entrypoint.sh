#!/usr/bin/env sh
set -e

if [ "$1" = 'front' ]; then
	# Start server
	echo "Starting server"
	yarn start
elif [ "$1" = 'build' ]; then
	# Build static files
	echo "Building static files..."
	yarn build

	# Start server
	echo "Starting server"
	yarn start
fi

exec "$@"

