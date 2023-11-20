import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def run():
    df = pd.read_csv('benchmark.csv')
    print(df)
    sns.catplot(data=df, x="size", y="time", jitter=True)
    plt.show()

if __name__ == "__main__":
    run()
