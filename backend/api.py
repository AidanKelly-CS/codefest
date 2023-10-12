import time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from sentiment_analysis import get_score
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
db = SQLAlchemy(app)
CORS(app)

from models import Referral

@app.route('/referrals/create', methods=['POST'])
def create_referral():
    FirstName = request.json.get('FirstName')
    Surname = request.json.get('Surname')
    DateOfBirth = request.json.get('DateOfBirth')
    Address = request.json.get('Address')
    GPName = request.json.get('GPName')
    GPAddress = request.json.get('GPAddress')
    GPPhone = request.json.get('GPPhone')
    ReceivedTherapyBefore = request.json.get('ReceivedTherapyBefore')
    usedPsychologicalServices = request.json.get('usedPsychologicalServices')
    MentalHealthDiagnosis = request.json.get('MentalHealthDiagnosis')
    MentalHealthAssessment = request.json.get('MentalHealthAssessment')
    SelfHarm = request.json.get('SelfHarm')
    Medication = request.json.get('Medication')
    TraumaticExperience = request.json.get('TraumaticExperience')
    ProfessionalsWorkingWithYou = request.json.get('ProfessionalsWorkingWithYou')
    MainDifficulty = request.json.get('MainDifficulty')
    PriorityScore = request.json.get('PriorityScore')
    Notes = request.json.get('Notes')
    ReferralType = request.json.get('ReferralType')
    preferredTherapyMethod = request.json.get('preferredTherapyMethod')
    preferredTime = request.json.get('preferredTime')
    eligibleForSupport = request.json.get('eligibleForSupport')
    isProcessed = request.json.get('isProcessed')

    difficulty_sentiment = get_score(MainDifficulty)
    print("sentiment:", difficulty_sentiment)
    PriorityScore = 0
    if(difficulty_sentiment > 0.5):
        PriorityScore += 2
    PriorityScore += 1 if ReceivedTherapyBefore else 0
    PriorityScore += 1 if usedPsychologicalServices else 0
    PriorityScore += 1 if MentalHealthDiagnosis else 0
    PriorityScore += 1 if MentalHealthAssessment else 0
    PriorityScore += 1 if SelfHarm else 0
    PriorityScore += 1 if Medication else 0
    PriorityScore += 1 if TraumaticExperience else 0
    PriorityScore += 1 if ProfessionalsWorkingWithYou else 0

    referral = Referral(
        FirstName=FirstName,
        Surname=Surname,
        DateOfBirth=DateOfBirth,
        Address=Address,
        GPName=GPName,
        GPAddress=GPAddress,
        GPPhone=GPPhone,
        ReceivedTherapyBefore=ReceivedTherapyBefore,
        usedPsychologicalServices=usedPsychologicalServices,
        MentalHealthDiagnosis=MentalHealthDiagnosis,
        MentalHealthAssessment=MentalHealthAssessment,
        SelfHarm=SelfHarm,
        Medication=Medication,
        TraumaticExperience=TraumaticExperience,
        ProfessionalsWorkingWithYou=ProfessionalsWorkingWithYou,
        MainDifficulty=MainDifficulty,
        Notes=Notes,
        ReferralType=ReferralType,
        preferredTherapyMethod=preferredTherapyMethod,
        preferredTime=preferredTime,
        eligibleForSupport=eligibleForSupport,
        isProcessed=isProcessed,
        PriorityScore=PriorityScore
    )
    


    db.session.add(referral)
    db.session.commit()

    return jsonify({'id': referral.id}), 201



@app.route('/referrals/<int:id>', methods=['PUT'])
def update_referral(id):
    referral = Referral.query.get(id)

    if not referral:
        return jsonify({'error': 'Referral not found'}), 404


    #eligible for support and isProcessed
    
    isProcessed = request.json.get('isProcessed')
    eligibleForSupport = request.json.get('eligibleForSupport')
    # preferredTherapyMethod = request.json.get('preferredTherapyMethod')

    referral.isProcessed = isProcessed
    referral.eligibleForSupport = eligibleForSupport
    # referral.preferredTherapyMethod = preferredTherapyMethod
    db.session.commit()

    return jsonify({'id': referral.id, 'isProcessed': referral.isProcessed}), 200



@app.route('/referrals', methods=['GET'])
def get_all_referrals():

    referrals = Referral.query.order_by(Referral.PriorityScore.desc(), Referral.Date.desc()).all()
    referral_list = []

    for referral in referrals:
        current_referral = {
            'id': referral.id,
            'Date': referral.Date,
            'FirstName': referral.FirstName,
            'Surname': referral.Surname,
            'DateOfBirth': referral.DateOfBirth,
            'Address': referral.Address,
            'GPName': referral.GPName,
            'GPAddress': referral.GPAddress,
            'GPPhone': referral.GPPhone,
            'ReceivedTherapyBefore': referral.ReceivedTherapyBefore,
            'usedPsychologicalServices': referral.usedPsychologicalServices,
            'MentalHealthDiagnosis': referral.MentalHealthDiagnosis,
            'MentalHealthAssessment': referral.MentalHealthAssessment,
            'SelfHarm': referral.SelfHarm,
            'Medication': referral.Medication,
            'TraumaticExperience': referral.TraumaticExperience,
            'ProfessionalsWorkingWithYou': referral.ProfessionalsWorkingWithYou,
            'difficulty': referral.MainDifficulty,
            'PriorityScore': referral.PriorityScore,
            'Notes': referral.Notes,
            'ReferralType': referral.ReferralType,
            'preferredTherapyMethod': referral.preferredTherapyMethod,
            'preferredTime': referral.preferredTime,
            'eligibleForSupport': referral.eligibleForSupport,
            'isProcessed': referral.isProcessed,
            'isFlagged': referral.PriorityScore >= 6
        }
        if referral.PriorityScore >= 6:
            referral_list.insert(0,current_referral)
        else:
            referral_list.append(current_referral)


    return jsonify(referral_list)

# @app.route('/sentiment/<text>')
# def get_sentiment(text):
#     return {'sentiment': get_score(text)}

# @app.route('/sentiment')
# def get_sentiment():
#     text = request.args.get('text')
#     print(text)
#     return {'sentiment': get_score(text)}
