package ch.usi.experimentation.assignment;

interface Sorter<T extends Comparable<T>> {
  void sort(T[] items);
}
