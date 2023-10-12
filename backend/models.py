from api import db
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime

class Referral(db.Model):
    __tablename__ = 'referrals'

    id = db.Column(db.Integer, primary_key=True)
    Date = db.Column(db.DateTime, default=datetime.utcnow())

    FirstName = db.Column(db.String())
    Surname = db.Column(db.String())
    DateOfBirth = db.Column(db.Date())
    Address = db.Column(db.String())

    GPName = db.Column(db.String())
    GPAddress = db.Column(db.String())
    GPPhone = db.Column(db.String())

    # fields used to calculate priority score
    ReceivedTherapyBefore = db.Column(db.Boolean())
    usedPsychologicalServices = db.Column(db.Boolean())
    MentalHealthDiagnosis = db.Column(db.Boolean())
    MentalHealthAssessment = db.Column(db.Boolean())
    SelfHarm = db.Column(db.Boolean())
    Medication = db.Column(db.Boolean())
    TraumaticExperience = db.Column(db.Boolean())
    ProfessionalsWorkingWithYou = db.Column(db.Boolean())
    MainDifficulty = db.Column(db.String()) #used for sentiment analysis
    PriorityScore = db.Column(db.Integer())

    Notes = db.Column(db.String())
    ReferralType = db.Column(db.String())

    # virtual or in person
    preferredTherapyMethod = db.Column(db.String())

    # preferred Time
    preferredTime = db.Column(db.String())

    eligibleForSupport = db.Column(db.Boolean())
    isProcessed = db.Column(db.Boolean())

    TherapistId = db.Column(db.Integer, db.ForeignKey('therapists.id'), nullable=True)

    def __init__(self, FirstName, Surname, DateOfBirth, Address, GPName, GPAddress, 
                 GPPhone, ReceivedTherapyBefore, usedPsychologicalServices, 
                 MentalHealthDiagnosis, MentalHealthAssessment, SelfHarm, 
                 Medication, TraumaticExperience, ProfessionalsWorkingWithYou, 
                 MainDifficulty, PriorityScore, Notes, ReferralType,
                 preferredTherapyMethod, preferredTime, eligibleForSupport, isProcessed
                 ):
        self.FirstName = FirstName
        self.Surname = Surname
        self.DateOfBirth = DateOfBirth
        self.Address = Address
        self.GPName = GPName
        self.GPAddress = GPAddress
        self.GPPhone = GPPhone
        self.ReceivedTherapyBefore = ReceivedTherapyBefore
        self.usedPsychologicalServices = usedPsychologicalServices
        self.MentalHealthDiagnosis = MentalHealthDiagnosis
        self.MentalHealthAssessment = MentalHealthAssessment
        self.SelfHarm = SelfHarm
        self.Medication = Medication
        self.TraumaticExperience = TraumaticExperience
        self.ProfessionalsWorkingWithYou = ProfessionalsWorkingWithYou
        self.MainDifficulty = MainDifficulty
        self.PriorityScore = PriorityScore
        self.Notes = Notes
        self.ReferralType = ReferralType
        self.preferredTherapyMethod = preferredTherapyMethod
        self.preferredTime = preferredTime
        self.eligibleForSupport = eligibleForSupport
        self.isProcessed = isProcessed  

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    
class Therapist(db.Model):
    __tablename__ = 'therapists'

    id = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String())
    Surname = db.Column(db.String())
    DateOfBirth = db.Column(db.Date())
    OfficeAddress = db.Column(db.String())
    TherapistType = db.Column(db.String())
    ClientIds = db.relationship('Referral', backref='therapists', lazy=True)
    
    def __init__(self, FirstName, Surname, DateOfBirth, OfficeAddress, TherapistType):
        self.FirstName = FirstName
        self.Surname = Surname
        self.DateOfBirth = DateOfBirth
        self.OfficeAddress = OfficeAddress
        self.TherapistType = TherapistType

    def __repr__(self):
        return '<id {}>'.format(self.id)
    