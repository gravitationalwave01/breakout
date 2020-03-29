# Breakout

This is an implementation of Breakout via [MDN's JS tutorial](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript).

## Playing the game

You can play the current version of the game [online](http://34.67.21.224:5000/)

## Running the game locally
To the run the game locally, you must have Python 3 installed. If you have Python3 installed, follow these steps:

1. clone this repo
2. `cd` into the repo
3. build a python virtual environment: `python -m venv venv`
4. activate the venv (either `source venv/bin/activate` on NIX or `source /venv/Scripts/activate` on Windows)
5. Install requisite packages `pip install -r requirements.txt`
6. Run the flask webservice `export FLASK_APP=./breakout/app.py; flask run`
7. In a browser, visit `localhost:5000/`, you should see the breakout game running
