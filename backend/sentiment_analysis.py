from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax

MODEL = f"cardiffnlp/twitter-roberta-base-sentiment-latest"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)


def get_score(text):
    encoded_text = tokenizer(text, return_tensors='pt')
    output = model(**encoded_text)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    
    negative_score = scores[0]
    neutral_score = scores[1]
    positive_score = scores[2]

    print("negative: ", negative_score)
    print("neutral: ", neutral_score)
    print("positive: ", positive_score)

    if negative_score > positive_score:
        return float(negative_score)
    else:
        return 0

