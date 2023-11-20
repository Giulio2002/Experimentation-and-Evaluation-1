package ch.usi.experimentation.assignment1;

/**
 * Bubble sort implementation class for while needed variant.
 *
 * @param <T> The type of the array
 */
public final class BubbleSortWhileNeeded<T extends Comparable<T>> implements Sorter<T> {

  /**
   * Sorts the given array using bubble sort while needed to sort.
   * Keeps maxIndex to avoid sorting already sorted items.
   * Possibly efficient, scalable.
   * Using temp var to swap items.
   * In-place algorithm.
   *
   * @param items The array to sort
   */
  public void sort(final T[] items) {
    int n = items.length;

    do {

      int maxIndex = 0;
      for (int i = 1; i < n; i++) {

        if (items[i - 1].compareTo(items[i]) > 0) {
          final T item = items[i - 1];
          items[i - 1] = items[i];
          items[i] = item;
          maxIndex = i;
        }

      }
      n = maxIndex;

    } while (n > 0);

  }
}

