# server imports
from flask import Flask, jsonify, request
from flask_cors import CORS

# language model imports 
import tensorflow as tf 
from transformers import TFAutoModelForSeq2SeqLM, TFAutoModelForSequenceClassification, AutoTokenizer
from transformers import pipeline


summary_model = TFAutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")
summary_tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")

sentiment_classifier = pipeline("sentiment-analysis")

paraphrase_model = TFAutoModelForSequenceClassification.from_pretrained("bert-base-cased-finetuned-mrpc")
paraphrase_tokenizer = AutoTokenizer.from_pretrained("bert-base-cased-finetuned-mrpc")

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# sanity check route
@app.route('/summary', methods=['GET'])
def summary(): 
	prompt = request.args['prompt']
	prompt = prompt.replace("%20", " ")
	print("attempting summary generation:",prompt)

	inputs = summary_tokenizer("summarize: " + prompt, return_tensors="tf", max_length=20)
	outputs = summary_model.generate(inputs["input_ids"], max_length=30, min_length=10, length_penalty=2.0, num_beams=2, early_stopping=True)
	result = summary_tokenizer.decode(outputs[0], skip_special_tokens=True)
	print("result:",result)

	return jsonify(result)

@app.route('/sentimentanalysis', methods=['GET'])
def sentiment():
	prompt = request.args['prompt1']
	prompt = prompt.replace("%20", " ")
	prompt2 = request.args['prompt2']
	prompt2 = prompt2.replace("%20", " ")
	print("attempting sentiment analysis:", prompt, prompt2)	

	result = sentiment_classifier(prompt)[0]
	result2 = sentiment_classifier(prompt2)[0]

	res_val = result['score']
	if (result['label'] == 'NEGATIVE'):
		res_val *= -1
	res2_val = result2['score']
	if (result2['label'] == 'NEGATIVE'):
		res_val2 *= -1

	print("result:", res_val, res_val2)
	return jsonify([res_val, res_val2]) 

@app.route('/checkparaphrase', methods=['GET'])
def paraphrase():
	prompt = request.args['prompt']
	prompt = prompt.replace("%20", " ")
	prompt2 = request.args['prompt2']
	prompt2 = prompt2.replace("%20", " ")
	print("attempting check paraphrase:", prompt, prompt2)

	# get paraphrase pipeline
	paraphrase = paraphrase_tokenizer(prompt, prompt2, return_tensors="tf")
	paraphrase_classification_logits = paraphrase_model(paraphrase).logits
	paraphrase_results = tf.nn.softmax(paraphrase_classification_logits, axis=1).numpy()[0]

	return jsonify(paraphrase_results[0]) # first class is "not paraphrase"


@app.route('/gpt2', methods=['GET'])
def gpt2gen():
	prompt = request.args['prompt']
	prompt = prompt.replace("%20", " ")
	print("attempting summary generation: " + prompt)


if __name__ == '__main__':
    app.run()