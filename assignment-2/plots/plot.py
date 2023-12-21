# We start by reading content in ../data.json and unmarshal into a dictionary

import json
import matplotlib.pyplot as plt
import numpy as np

with open('../data.json') as f:
    data = json.load(f)

print(data)

cases = {
    '2-words-camel': [],
    '2-words-kebab': [],
    '4-words-camel': [],
    '4-words-kebab': [],
    '6-words-camel': [],
    '6-words-kebab': [],
}

# Iterate over the data (it is an array of objects)
for d in data:
    questions = d['questions']
    prevCount = 2
    kebabSum = 0
    camelSum = 0
    camelTot = 0
    kebabTot = 0
    # iterate over the questions (it is an array of objects)§
    for q in questions:
        words = q['wordsCount']
        correct_word = q['correct_word']
        case = 'kebab'
        # if correct_word has an even one uppercase letter, then it is camel case
        if any(char.isupper() for char in correct_word):
            case = 'camel'
            camelSum += q['timer']
            camelTot += 1
        else:
            kebabSum += q['timer']
            kebabTot += 1
        # append the words count to the corresponding case
        if prevCount != words:
            cases[f'{prevCount}-words-camel'].append(camelSum / camelTot)
            cases[f'{prevCount}-words-kebab'].append(kebabSum / kebabTot)
            prevCount = words
            kebabSum = 0
            camelSum = 0
            kebabTot = 0
            camelTot = 0
    cases[f'{prevCount}-words-camel'].append(camelSum / camelTot)
    cases[f'{prevCount}-words-kebab'].append(kebabSum / kebabTot)

# Now generate box plots for each case, all in one figure, all in the same graph, make the graph wide
fig, ax = plt.subplots()
# make it wide
fig.set_figwidth(20)
ax.boxplot(cases.values())
ax.set_xticklabels(cases.keys())
ax.set_ylabel('Time (seconds)')
ax.set_xlabel('Case')
plt.title('Time taken to answer questions')
plt.grid(True)
plt.tight_layout()
plt.savefig('plots.png')
