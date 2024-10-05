from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import sys
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)

# Load the model and tokenizer
try:
    tokenizer = AutoTokenizer.from_pretrained("google/gemma-7b")
    model = AutoModelForCausalLM.from_pretrained("google/gemma-7b", device_map="auto", torch_dtype=torch.bfloat16)
    logging.info("Model and tokenizer loaded successfully.")
except Exception as e:
    logging.error(f"Failed to load model or tokenizer: {str(e)}")
    sys.exit(1)

# Get the user input prompt from the command-line argument
if len(sys.argv) < 2:
    logging.error("No prompt provided.")
    sys.exit(1)

prompt = sys.argv[1]
logging.info(f"Received prompt: {prompt}")

try:
    # Tokenize and process the input
    input_ids = tokenizer(prompt, return_tensors="pt").to("cuda")

    # Generate output
    output = model.generate(**input_ids)

    # Decode and print the output
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    print(response)
except Exception as e:
    logging.error(f"Error during model processing: {str(e)}")
    sys.exit(1)
