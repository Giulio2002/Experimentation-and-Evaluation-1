import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def five_number_summary(data):
    """Print the five-number summary for the given data."""
    summary = data.describe(percentiles=[.25, .5, .75])
    print("Minimum:", summary['min'])
    print("First Quartile:", summary['25%'])
    print("Median:", summary['50%'])
    print("Third Quartile:", summary['75%'])
    print("Maximum:", summary['max'])

def run():
    # Load data from CSV
    df = pd.read_csv('benchmark.csv')

    # Print the DataFrame to view its contents
    print(df)

    # Set the style and palette of the plot
    sns.set(style="ticks", context="talk")
    palette = sns.color_palette("bright")

    # Create a FacetGrid for customizing the line styles
    g = sns.FacetGrid(df, col="type", row="array", hue="algorithm", palette=palette, aspect=0.6)
    
    # Map the plot type to the FacetGrid
    g = g.map(plt.plot, "size", "time", linestyle="-", lw=1)

    # Iterate through axes to adjust line width and style for 'BubbleSortUntilNoChange'
    for ax in g.axes.flatten():
        lines = ax.get_lines()
        for line in lines:
            if line.get_label() == 'BubbleSortUntilNoChange':
                line.set_linewidth(2.5)  # Increase the line width
                line.set_linestyle('--')  # Set a distinct dashed line style

    # Adjusting the font size for 'type' labels
    g.set_titles(col_template="{col_name}", row_template="{row_name}", size=10)

    # Add a legend and adjust the layout
    g.add_legend()
    g.set_xticklabels(rotation=90)
    plt.subplots_adjust(top=0.85)
    g.fig.suptitle('Sorting Algorithm Performance by Array Type and Initial State')

    # Display the plot
    plt.show()

    # Print the five-number summary for each group
    grouped = df.groupby(['type', 'algorithm', 'array'])
    for name, group in grouped:
        print(f"\nFive-number summary for {name}:")
        five_number_summary(group['time'])

if __name__ == "__main__":
    run()
