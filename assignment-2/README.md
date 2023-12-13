# Experimentation and Evaluation

## Assignment 2: camelCase vs kebab-case

## Setup

Clone the repository.
Python dependencies are handled with [Poetry](#references).
To immediately create a virtual environment and install dependencies run:
```shell
poetry shell
poetry install --no-root
```
Then, you can use the Jupiter notebook.

## Sample test case

Sample object:
```json
{
  "age" : 21,
  "use_glasses": true|false,
  "reading_impairment": true|false,
  "role": "profesor"|"student"|"other",
  "questions": [...]
}
```

Question object:
```json
{
  "timer": 60000,
  "correct_word": "this word",
  "correct_kind": "camel"|"kebab",
  "wrong_selections": [...]
}
```

Selection object:
```json
{
  "word": "thisword",
  "type": "camel"|"kebab"
}
```

## References
- [iCorsi3 slides](https://www.icorsi.ch/course/view.php?id=16919)
- [Python Poetry](https://python-poetry.org/docs/)
- [How to detect outliers in z-score](https://www.machinelearningplus.com/machine-learning/how-to-detect-outliers-with-z-score/)