from app import config
from flask import Flask
from flask import render_template


app = Flask(__name__,
            template_folder=config.TEMPLATE_FOLDER,
            static_folder=config.STATIC_FOLDER)
app.config.from_object(config)

@app.route("/")
def hello():
    return render_template('home.html')
