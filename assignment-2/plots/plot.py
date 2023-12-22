# We start by reading content in ../data.json and unmarshal into a dictionary

import json
import matplotlib.pyplot as plt
import numpy as np

with open('../data.json') as f:
    data = json.load(f)

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
    # iterate over the questions (it is an array of objects)§
    for q in questions:
        if len(q['wrongs']) > 0 or q['timer'] < 300:
            continue
        words = q['wordsCount']
        correct_word = q['correct_word']
        case = 'kebab'
        # if correct_word has an even one uppercase letter, then it is camel case
        if any(char.isupper() for char in correct_word):
            case = 'camel'
            cases[f'{words}-words-camel'].append(q['timer'])
        else:
            cases[f'{words}-words-kebab'].append(q['timer'])
            
        

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


statistics = {}

for key, values in cases.items():
    values_array = np.array(values)
    statistics[key] = {
        'min': np.min(values_array),
        'max': np.max(values_array),
        '25th percentile': np.percentile(values_array, 25),
        '50th percentile': np.percentile(values_array, 50), # Median
        '75th percentile': np.percentile(values_array, 75),
    }

for key, value in statistics.items():
    print(key, value)