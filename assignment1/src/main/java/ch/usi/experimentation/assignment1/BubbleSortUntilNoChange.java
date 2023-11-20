package ch.usi.experimentation.assignment1;

/**
 * Bubble sort implementation class for no change variant.
 *
 * @param <T> The type of the array
 */
public final class BubbleSortUntilNoChange<T extends Comparable<T>> implements Sorter<T> {

  /**
   * Sorts the given array using bubble sort until nothing changes.
   * Naive approach: as long as a swap happens, it sorts through the whole array again
   * in the next iteration.
   * Possibly inefficient, not scalable.
   * Using temp var to swap items.
   *
   * @param items The array to sort
   */
  public void sort(final T[] items) {
    boolean changed;

    do {

      changed = false;
      for (int i = 0; i < items.length - 1; i++) {

        if (items[i].compareTo(items[i + 1]) > 0) {
          final T item = items[i];
          items[i] = items[i + 1];
          items[i + 1] = item;
          changed = true;
        }

      }

    } while (changed);

  }
}
