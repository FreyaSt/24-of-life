from flask import Flask, render_template
from livereload import Server

app = Flask(__name__, static_url_path='', static_folder='static')
app.config['DEBUG'] = True

@app.route('/')
def index():
    return render_template("index.html")


server = Server(app.wsgi_app)
server.serve()
