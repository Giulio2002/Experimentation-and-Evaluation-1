package ch.usi.experimentation.assignment;

/**
 * Bubble sort implementation class, passing item variant.
 *
 * @param <T> The type of the array
 */
public final class BubbleSortPassPerItem<T extends Comparable<T>> implements Sorter<T> {

  /**
   * Sorts the given array using bubble sort with variant "pass" per item.
   * Negligent approach: always iterating n^2 times even if already sorted.
   * Using temp var to swap items.
   * Easy to implement, not efficient, not scalable.
   * In-place algorithm.
   *
   * @param items The array to sort
   */
  public void sort(final T[] items) {

    for (int pass = 0; pass < items.length; pass++) {

      for (int i = 0; i < items.length - 1; i++) {

        if (items[i].compareTo(items[i + 1]) > 0) {
          final T item = items[i];
          items[i] = items[i + 1];
          items[i + 1] = item;
        }

      }

    }

  }
}
