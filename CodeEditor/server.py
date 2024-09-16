from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

app = Flask(__name__)
code_snippets = [
    "function show(num)",
    "    return num*num",
    "function add(a, b):",

    "return a+b"
]

with open('dataset.txt','r') as data:
    lines = data.readlines()
for line in lines:
    code_snippets.append(line)
tokenizer = Tokenizer()
tokenizer.fit_on_texts(code_snippets)
total_words = len(tokenizer.word_index) + 1

input_sequences = []
for line in code_snippets:
    token_list = tokenizer.texts_to_sequences([line])[0]
    for i in range(1, len(token_list)):
        n_gram_sequence = token_list[:i+1]
        input_sequences.append(n_gram_sequence)

max_sequence_len = max([len(x) for x in input_sequences])
input_sequences = pad_sequences(input_sequences, maxlen=max_sequence_len, padding='pre')

predictors, labels = input_sequences[:,:-1], input_sequences[:,-1]
labels = tf.keras.utils.to_categorical(labels, num_classes=total_words)


model = tf.keras.Sequential([
    tf.keras.layers.Embedding(total_words, 100, input_length=max_sequence_len-1),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(150)),
    tf.keras.layers.Dense(total_words, activation='softmax')
])

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(predictors, labels, epochs=100, verbose=0)

def get_code_suggestions(code):
    input_sequence = tokenizer.texts_to_sequences([code])[0]
    input_sequence = pad_sequences([input_sequence], maxlen=max_sequence_len-1, padding='pre')
    predicted_probabilities = model.predict(input_sequence, verbose=0)[0]
    predicted_index = np.argmax(predicted_probabilities)
    predicted_code = tokenizer.index_word[predicted_index]
    return predicted_code

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    code = data['code']
    suggestions = get_code_suggestions(code)
    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run(debug=True)
