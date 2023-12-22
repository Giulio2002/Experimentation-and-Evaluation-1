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
A computer device and a keyboard with number row / number pad is required
to minimize the delay between reaction time and option selection.

### Experiment assessment

Every user candidate fills the form with its personal data:

-   age
-   use glasses
-   reading impairment
-   role
    -   student
    -   professor
    -   employee
    -   other

Then, the user can start the experiment:
a timer measures in milliseconds the time spent to complete each question.

The user is presented with a sentence: white space separated words.
After a 3 seconds countdown to read it, a selection of options is shown
where only one is the correct alternative for the sentence in either
camel case or kebab case variant.
Wrong selections are registered.

There are 33 questions in the following order:

-   3 warm-up: neglected from analysis
-   10 cases: 2 words short length, 5 kebab / 5 camel variants
-   10 cases: 4 words medium length, 4 kebab / 6 camel variants
-   10 cases: 6 words long length, 4 kebab / 6 camel variants

Sample object:

```json
{
    "age": 21,
    "use_glasses": true,
    "reading_impairment": false,
    "role": "professor",
    "questions": []
}
```

Question object:

```json
{
    "timer": 60000,
    "correct_word": "this-word",
    "correct_kind": "kebab",
    "wrong_selections": []
}
```

Selection object:

```json
{
    "word": "this-world"
}
```

### Data Analysis

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Poetry](https://img.shields.io/badge/Poetry-%233B82F6.svg?style=for-the-badge&logo=poetry&logoColor=0B3D8D)
![Jupyter Notebook](https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)
![SciPy](https://img.shields.io/badge/SciPy-%230C55A5.svg?style=for-the-badge&logo=scipy&logoColor=%white)

![Python version](https://img.shields.io/badge/python-3.10-blue.svg)
[![Poetry](https://img.shields.io/endpoint?url=https://python-poetry.org/badge/v0.json)](https://python-poetry.org/)
[![jupyter](https://img.shields.io/badge/Jupyter-Lab-F37626.svg?style=flat&logo=Jupyter)](https://jupyterlab.readthedocs.io/en/stable)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

#### Setup

Clone the repository.
Python dependencies are handled with [Poetry](#references).
To immediately create a virtual environment and install dependencies run:

```shell
poetry shell  # enters the virtual environment created by poetry and echos the virtualenv path
poetry install --no-root  # install dependencies inside it
```

Then, you can use the Jupiter notebook from withing the virtualenv.

If you use Jupiter from IDEs like PyCharm,
you can use the virtualenv by setting it as the project interpreter.
In the bottom right corner of the IDE,
you can select to add a new local interpreter and select the virtualenv created by poetry.
Usually, location of poetry virtualenvs is `~/.cache/pypoetry/virtualenvs/`.

#### Jupiter Notebook reproducibility

Go to the [jupyter notebook](./display.ipynb) to see the analysis performed:
it's a step-by-step guide that leads from raw data in json format
to pandas dataframe, questions clusterization, data filtering, plots and
inferential statistical analysis to prove experiment hypothesis.

### References

-   [iCorsi3 slides](https://www.icorsi.ch/course/view.php?id=16919)
-   [Python Poetry](https://python-poetry.org/docs/)
-   [How to detect outliers in z-score](https://www.machinelearningplus.com/machine-learning/how-to-detect-outliers-with-z-score/)
-   [Mental chronometry](https://en.wikipedia.org/wiki/Mental_chronometry#References)
-   [Python Seaborn docs](https://seaborn.pydata.org/)
-   [Inferential Statistical Analysis using Python](https://brainalystacademy.com/inferential-statistics-in-python/)
