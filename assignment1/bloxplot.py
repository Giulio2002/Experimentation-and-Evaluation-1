import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def run(arrayType):
    df = pd.read_csv('benchmark.csv')
    df_filtered = df[df['array'] == arrayType]

    # Calculating Statistics
    stats = df_filtered.groupby(['size', 'algorithm'])['time'].describe(percentiles=[.25, .5, .75])

    # Visualization
    sns.set(style="ticks", context="talk")
    palette = sns.color_palette("bright")
    g = sns.FacetGrid(df_filtered, row="size", height=3, aspect=2, margin_titles=True, sharey=False)
    g.map(sns.boxplot, "algorithm", "time", palette=palette, order=df_filtered['algorithm'].unique())
    g.set_titles(row_template="Size: {row_name}")
    g.set_axis_labels(f"{arrayType} array", "Time (ns)")

    # Adjusting y-axis limits and Adding Annotations
    for i, ax in enumerate(g.axes.flatten()):
        size = df_filtered['size'].unique()[i]
        # Adjust y-axis limit
        ymax = df_filtered[df_filtered['size'] == size]['time'].max()
        ax.set_ylim(top=ymax * 1.2)  # Increase the y-axis limit by 20%
        for j, algorithm in enumerate(df_filtered['algorithm'].unique()):
            # Subset stats for the specific size and algorithm
            subset_stats = stats.loc[(size, algorithm)]
            text = f"Min: {subset_stats['min']:.2f}\n25%: {subset_stats['25%']:.2f}\nMedian: {subset_stats['50%']:.2f}\n75%: {subset_stats['75%']:.2f}\nMax: {subset_stats['max']:.2f}"
            # Positioning the text
            ax.text(j, subset_stats['max'], text, horizontalalignment='center', size='xx-small', color='black')

    plt.show()

if __name__ == "__main__":
    run("sorted")
    run("random")
    run("reverse")
