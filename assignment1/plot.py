import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def run():
    # Load data from CSV
    df = pd.read_csv('benchmark.csv')

    # Ensure 'size' column is numeric
    df['size'] = pd.to_numeric(df['size'], errors='coerce')

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

    # Adjust the layout
    plt.subplots_adjust(top=0.9)
    g.fig.suptitle('Sorting Algorithm Performance by Array Type and Initial State')

    # Display the plot
    plt.show()

if __name__ == "__main__":
    run()
