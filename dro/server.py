from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO()

@app.route('/')
def index():
    return 'a'

data = []
steps = 100

started = False

@socketio.on('connect')
def test_connect():
    emit('connect', 4)

@socketio.on('start')
def test_start():
    global started
    if started: return
    started = True
    end = { 'lat': 46.53443, 'lon': -72.75409 }
    init = { 'lat': 46.54542, 'lon': -72.74997}
    for i in range(5):
        data.append({
            'lat': end['lat'] + random.random()/20000,
            'lng': end['lon'] + random.random()/20000,
        })

    for i in range(steps):
        percent = i/steps
        data.append({
            'lat': init['lat']*percent + end['lat']*(1-percent) + random.random()/10000,
            'lng': init['lon']*percent + end['lon']*(1-percent) + random.random()/10000,
        })

@socketio.on('plz')
def test_plz():
    socketio.sleep(0.1)
    while len(data) <= 0:
        socketio.sleep(0.1)
    emit('position', data.pop(0))



if __name__ == '__main__':
    socketio.init_app(app, cors_allowed_origins="*")
    socketio.run(app, debug=True)
