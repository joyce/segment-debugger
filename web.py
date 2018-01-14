#!/usr/bin/env python
from app import app
from app import config
from app import socketio

if __name__ == "__main__":
    # If you want to let people connect to your machine over wifi bind
    # to '0.0.0.0' which binds to any interface, not just the local
    # loopback one.
    socketio.run(app, '127.0.0.1', debug=config.DEBUG, port=config.PORT)
