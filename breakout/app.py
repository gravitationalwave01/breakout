from flask import Flask, send_from_directory
app = Flask(__name__,)

@app.route('/')
def breakout():
    return app.send_static_file('index.html') 

if __name__ == '__main__':
    app.run(use_reloader=True, debug=True)
