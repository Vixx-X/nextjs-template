#!/usr/bin/env sh
set -e

if [ "$1" = 'next-solocarro' ]; then
	# Start server
	echo "Starting server"
	yarn start
elif [ "$1" = 'build' ]; then
	# Build static files
	echo "Building static files..."
	yarn build

	# Start server
	echo "Starting server"
fi

exec "$@"

