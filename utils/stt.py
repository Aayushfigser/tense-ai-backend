'''This is now perfect for real-time Speech to text Conversion'''



import speech_recognition as sr

# Function to capture live audio from the microphone
def capture_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source)
        try:
            print("Transcribing audio...")
            text = r.recognize_google(audio)
            print(f"Transcribed Text: {text}")
            return text
        except sr.UnknownValueError:
            print("I didn't understand.")
        except sr.RequestError as e:
            print(f"Error: {e}")
        return ""
    
if __name__ == "__main__":
    captured_text = capture_audio()
    print(f"Captured Text: {captured_text}")
