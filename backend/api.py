import time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from sentiment_analysis import get_score

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
db = SQLAlchemy(app)

from models import Referral

@app.route('/referrals/create', methods=['POST'])
def create_referral():
    name = request.json.get('name')

    referral = Referral(name=name)
    db.session.add(referral)
    db.session.commit()

    return jsonify({'id': referral.id, 'name': referral.name}), 201


@app.route('/referrals', methods=['GET'])
def get_all_referral():
    referrals = Referral.query.all()

    for referral in referrals:
        print(referral.id, referral.name)
    return {'status': 'success'}

# @app.route('/sentiment/<text>')
# def get_sentiment(text):
#     return {'sentiment': get_score(text)}

# @app.route('/sentiment')
# def get_sentiment():
#     text = request.args.get('text')
#     print(text)
#     return {'sentiment': get_score(text)}
