CREATE TABLE Client (
    ClientID int,
    LastName varchar(255),
    FirstName varchar(255),
    ClientAddress varchar(255),
    PhoneNumber varchar (255),
    DateOfBirth varchar (255),
    NOKLastName varchar(255),
    NOKFirstName varchar(255),
    NOKEmail varchar(255),
    NOKPhoneNumber varchar (255),
    IsAdult binary,
    TherapistID int, 
    ReferralID int
);

CREATE TABLE Referral (
    ReferralID int,
    ClientID int,
    GPLastName varchar(255),
    GPFirstName varchar(255),
    GPAddress varchar(255),
    Impairment binary,
    ReceivedTherapyBefore binary,
    MentalHealthDiagnoses binary,
    MentalHealthAssessment binary,
    SelfHarm binary,
    Medication binary,
    TraumaticExp binary,
    ProfessionalsWorkingWithYou binary,
    MainDifficulty varchar(255),
    LegalCases binary,
    PriorityScore int
);

CREATE TABLE Appointment (
    ApptID int,
    ClientID int,
    ReferralID int,
    TherapistID int,
    LocationAppt varchar(255),
    StartDateTime datetime,
    EndDateTime datetime
);

CREATE TABLE Therapist (
    TherapistID int,
    LastName varchar(255),
    FirstName varchar(255),
    TypeofTherapist varchar(255),
    OfficeAddress varchar(255)
);