import gevent
import json
import redis
from app import config

from flask import copy_current_request_context
from flask import Flask, render_template
from flask import request
from flask_socketio import SocketIO


# app = Flask(__name__,
#             static_folder="../static/dist", template_folder="../static")
app = Flask(__name__,
            template_folder=config.TEMPLATE_FOLDER,
            static_folder=config.STATIC_FOLDER)
app.config.from_object(config)
socketio = SocketIO(app)


@app.route("/")
def hello():
    return render_template('home.html')


@socketio.on('connect', namespace='/stream')
def connect_deploys():
    @copy_current_request_context
    def event_listener(namespace):
        r = redis.Redis(host='localhost', port=config.REDIS_PORT)
        pubsub = r.pubsub()
        pubsub.subscribe('events')

        for item in pubsub.listen():
            if item['type'] == 'message':
                data = json.loads(item['data'])
                socketio.emit('event', json.dumps(data), namespace=namespace)

    gevent.spawn(event_listener, request.namespace)
