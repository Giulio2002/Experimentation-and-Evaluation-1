# Experimentation and Evaluation

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](https://github.com/pre-commit/pre-commit)

## Assignment 2: camelCase vs kebab-case

### Report

The report is hosted on Google Docs,
created following the issued template guidelines for experiments.

https://docs.google.com/document/d/1TWYcJSBBm_dTWRWt2--jIQON1vYvf0uN7O6bk6r4zU4/edit?usp=sharing

### Tool for data collection

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

The tool is hosted on Heroku, it's a Node.js server application with
plain HTML, CSS and JavaScript,
and it's available at the following link:

https://evalualuation-assignment2-77d1761f9a41.herokuapp.com/

The tool is a simple web page that allows the user to perform the experiment.
The user fills the form with:

-   age
-   use glasses
-   reading impairment
-   role
    -   student
    -   professor
    -   other

Then, the user can start the experiment:
a timer is measuring how much time the user takes to complete each question.

The user is presented with a word, and a selection of words where
only one is the correct alternative.
Wrong selections are registered with its type (camelCase or kebab-case).

There are 33 questions in the following order:

-   3 questions are warm-up questions
-   10 questions are short length
-   10 questions are medium length
-   10 questions are long length

Sample object:

```json
{
    "age": 21,
    "use_glasses": true,
    "reading_impairment": false,
    "role": "profesor",
    "questions": []
}
```

Question object:

```json
{
    "timer": 60000,
    "correct_word": "this word",
    "correct_kind": "camel",
    "wrong_selections": []
}
```

Selection object:

```json
{
    "word": "thisword",
    "type": "kebab"
}
```

### Data Analysis

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)

![Python version](https://img.shields.io/badge/python-3.10-blue.svg)
[![Poetry](https://img.shields.io/endpoint?url=https://python-poetry.org/badge/v0.json)](https://python-poetry.org/)
[![jupyter](https://img.shields.io/badge/Jupyter-Lab-F37626.svg?style=flat&logo=Jupyter)](https://jupyterlab.readthedocs.io/en/stable)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

#### Setup

Clone the repository.
Python dependencies are handled with [Poetry](#references).
To immediately create a virtual environment and install dependencies run:

```shell
poetry shell  # enters the virtual environment created by poetry
poetry install --no-root  # install dependencies inside it
```

Then, you can use the Jupiter notebook.

### References

-   [iCorsi3 slides](https://www.icorsi.ch/course/view.php?id=16919)
-   [Python Poetry](https://python-poetry.org/docs/)
-   [How to detect outliers in z-score](https://www.machinelearningplus.com/machine-learning/how-to-detect-outliers-with-z-score/)
