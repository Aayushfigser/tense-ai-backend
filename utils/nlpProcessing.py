from textblob import TextBlob
import spacy
import sys
import json

nlp = spacy.load('en_core_web_sm')

def preprocess_text(text):
    """
    Preprocesses the user input text by tokenizing, removing stop words, and lemmatizing.
    """
    doc = nlp(text)
    processed_text = " ".join([token.lemma_ for token in doc if not token.is_stop])
    return processed_text

def classify_intent(text):
    """
    Uses basic NLP rules to classify the intent of the user input.
    """
    doc = nlp(text)
    if any(token.lemma_ in ['set', 'goal'] for token in doc):
        return "set_goal"
    elif any(token.lemma_ in ['track', 'progress'] for token in doc):
        return "track_progress"
    elif any(token.lemma_ in ['ask', 'question'] for token in doc):
        return "ask_question"
    elif any(token.lemma_ in ['command', 'follow'] for token in doc):
        return "command_follow"
    else:
        return "unknown"

def analyze_sentiment(text):
    """
    Analyzes sentiment using TextBlob, which returns a polarity score.
    Polarity is a float within the range [-1.0, 1.0].
    """
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    if polarity > 0:
        return "positive"
    elif polarity < 0:
        return "negative"
    else:
        return "neutral"

def analyze_tone(text):
    """
    Analyzes the tone of the input to adjust feedback to RL agent.
    """
    doc = nlp(text)
    if any(token.lemma_ in ['angry', 'frustrate'] for token in doc):
        return "angry"
    elif any(token.lemma_ in ['happy', 'excite'] for token in doc):
        return "positive"
    elif any(token.lemma_ in ['calm', 'passionate'] for token in doc):
        return "positive"
    else:
        return "neutral"

if __name__ == '__main__':
    task = sys.argv[2]  # The task can be either 'analyze_sentiment', 'classify_intent', or 'analyze_tone'
    text = sys.argv[1]

    if task == 'analyze_sentiment':
        result = analyze_sentiment(text)
    elif task == 'classify_intent':
        result = classify_intent(text)
    elif task == 'analyze_tone':
        result = analyze_tone(text)
    else:
        result = "invalid task"

    print(json.dumps({"result": result}))  # Return result as JSON
