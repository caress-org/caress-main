from flask import Flask, render_template, request,jsonify
from chatbot import get_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/predict",methods=["POST"])
def predict():
	key = request.get_json().get("api-key")
	text = request.get_json().get("message")
	if key == '0000000000':
		response = get_response(text)
		message = {"answer": response}
		return jsonify(message)

	else:
		return jsonify(
			{
			"error": "invalid api key"
			}
		)

if __name__=='__main__':
	app.run(debug=True)