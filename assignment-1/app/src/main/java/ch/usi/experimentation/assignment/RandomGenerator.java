package ch.usi.experimentation.assignment;

import java.util.Random;

/**
 * Interface to create a random array of a given type.
 *
 * @param <T> The type of the array
 */
public interface RandomGenerator<T extends Comparable<T>> {
  T[] createRandomArray(int size, Random random);
}
