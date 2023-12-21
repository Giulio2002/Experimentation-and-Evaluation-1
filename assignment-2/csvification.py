# print the serie of questions sentences (with whitespaces separated by a space) and the solution: camelCase = false, kebabCase = true

    # {
    #     "options": [
    #         [
    #             [
    #                 "fish",
    #                 "much"
    #             ],
    #             false
    #         ],
    #         [
    #             [
    #                 "fise",
    #                 "muph"
    #             ],
    #             false
    #         ],
    #         [
    #             [
    #                 "fbsh",
    #                 "mcch"
    #             ],
    #             false
    #         ],
    #         [
    #             [
    #                 "fihh",
    #                 "mpch"
    #             ],
    #             false
    #         ]
    #     ],
    #     "correct": [
    #         [
    #             "fish",
    #             "much"
    #         ],
    #         false
    #     ]
    # },
    # {
    #     "options": [
    #         [
    #             [
    #                 "fooget",
    #                 "uuild"
    #             ],
    #             true
    #         ],
    #         [
    #             [
    #                 "forgee",
    #                 "bmild"
    #             ],
    #             true
    #         ],
    #         [
    #             [
    #                 "forgrt",
    #                 "buill"
    #             ],
    #             true
    #         ],
    #         [
    #             [
    #                 "forget",
    #                 "build"
    #             ],
    #             true
    #         ]
    #     ],
    #     "correct": [
    #         [
    #             "forget",
    #             "build"
    #         ],
    #         true
    #     ]
    # }, ...

# json is questions.json, output is print
# it should be in stdout, so you can redirect it to a file

# The output should look like this:
# questions: fish much, ...
# solution: fishMuch, ...   

import json
import csv

# make the lists of questions and solutions
questions = []
solutions = []

with open('questions.json') as json_file:
    data = json.load(json_file)
    for p in data:
        solutions.append(p['correct'])
    
    l = len(solutions)
    i = 0
    # print the questions array, it is an array of array
    for q in solutions:
        sublist = q[0]
        j = 0
        ll = len(sublist)
        # print the [str] of the sublist in whitespace
        for s in sublist:
            j += 1
            if j != ll:
                print(s, end=" ")
        i += 1
        if i != l:
            print(end=",")
    print()
    print()

     # print the questions array, it is an array of array
    for q in solutions:
        sublist = q[0]
        camelCase = q[1]
        # print the [str] of the sublist in camel or kebab case
        for s in sublist:
            if camelCase:
                print(s.capitalize(), end="")
            else:
                print(s, end="-")
        print(end=", ")
        