package ch.usi.experimentation.assignment1;

import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;
import java.util.Random;

/**
 * Main class to run the benchmark.
 */
public class Main {

  private static ThreadMXBean bean = ManagementFactory.getThreadMXBean();

  /**
   * Main method to run the benchmark.
   *
   * @param args Command line arguments
   */
  public static void main(String[] args) {
    int[] arraySizes = {10, 200};

    // Initialize the random number generator
    Random random = new Random();
    // Test cases
    for (int size : arraySizes) {
      System.out.println("Array Size: " + size);

      System.out.println("");
      // List of Integers
      benchmarkSort(new IntegerArrayCreator(), size, random);
      System.out.println("");

      // List of Strings
      benchmarkSort(new StringArrayCreator(), size, random);
      System.out.println("");

      // List of BigObjects
      benchmarkSort(new BigObjectArrayCreator(), size, random);

      System.out.println("");
    }
  }

  /**
   * Interface to create a random array of a given type.
   *
   * @param <T> The type of the array
   */
  public interface RandomizerCreator<T extends Comparable<T>> {
    T[] createRandomArray(int size, Random random);
  }

  private static final int BENCHMARK_RUNS = 100_000;

  private static <T extends Comparable<T>> void benchmarkSort(
          RandomizerCreator<T> r,
          int size,
          Random random) {

    long totalTimePassPerItem = 0;
    long totalTimeUntilNoChange = 0;
    long totalTimeWhileNeeded = 0;

    T[] arrayCopy = r.createRandomArray(size, random);

    // First let it do work on fewer runs, size should be the same however,
    // behaviour should be the same just not counted
    for (int i = 0; i < BENCHMARK_RUNS / 10; i++) {
      arrayCopy = r.createRandomArray(size, random);

      // Sort using BubbleSortPassPerItem and measure total time
      BubbleSortPassPerItem<T> sorterPassPerItem = new BubbleSortPassPerItem<>();
      measureSortTime(sorterPassPerItem, arrayCopy.clone());

      // Sort using BubbleSortUntilNoChange and measure total time
      BubbleSortUntilNoChange<T> sorterUntilNoChange = new BubbleSortUntilNoChange<>();
      measureSortTime(sorterUntilNoChange, arrayCopy.clone());

      // Sort using BubbleSortWhileNeeded and measure total time
      BubbleSortWhileNeeded<T> sorterWhileNeeded = new BubbleSortWhileNeeded<>();
      measureSortTime(sorterWhileNeeded, arrayCopy.clone());
    }

    for (int i = 0; i < BENCHMARK_RUNS; i++) {
      arrayCopy = r.createRandomArray(size, random);

      // Sort using BubbleSortPassPerItem and measure total time
      BubbleSortPassPerItem<T> sorterPassPerItem = new BubbleSortPassPerItem<>();
      totalTimePassPerItem += measureSortTime(sorterPassPerItem, arrayCopy.clone());

      // Sort using BubbleSortUntilNoChange and measure total time
      BubbleSortUntilNoChange<T> sorterUntilNoChange = new BubbleSortUntilNoChange<>();
      totalTimeUntilNoChange += measureSortTime(sorterUntilNoChange, arrayCopy.clone());

      // Sort using BubbleSortWhileNeeded and measure total time
      BubbleSortWhileNeeded<T> sorterWhileNeeded = new BubbleSortWhileNeeded<>();
      totalTimeWhileNeeded += measureSortTime(sorterWhileNeeded, arrayCopy.clone());
    }

    // Calculate the average time for each sort method
    long averageTimePassPerItem = totalTimePassPerItem / BENCHMARK_RUNS;
    long averageTimeUntilNoChange = totalTimeUntilNoChange / BENCHMARK_RUNS;
    long averageTimeWhileNeeded = totalTimeWhileNeeded / BENCHMARK_RUNS;

    // Output the results
    System.out.println("Type: " + arrayCopy.getClass().getSimpleName());
    System.out.println("BubbleSortPassPerItem Average Time: " + averageTimePassPerItem + " ns");
    System.out.println("BubbleSortUntilNoChange Average Time: " + averageTimeUntilNoChange + " ns");
    System.out.println("BubbleSortWhileNeeded Average Time: " + averageTimeWhileNeeded + " ns");
  }


  private static <T extends Comparable<T>> long measureSortTime(Sorter<T> sorter, T[] array) {
    long startTime = bean.getCurrentThreadCpuTime();
    sorter.sort(array);
    long endTime = bean.getCurrentThreadCpuTime();
    return endTime - startTime;
  }

  static class IntegerArrayCreator implements RandomizerCreator<Integer> {
    @Override
    public Integer[] createRandomArray(int size, Random random) {
      Integer[] array = new Integer[size];
      for (int i = 0; i < size; i++) {
        array[i] = random.nextInt();
      }
      return array;
    }
  }

  static class StringArrayCreator implements RandomizerCreator<String> {
    @Override
    public String[] createRandomArray(int size, Random random) {
      String[] array = new String[size];
      for (int i = 0; i < size; i++) {
        array[i] = "Str" + random.nextInt();
      }
      return array;
    }
  }

  static class BigObjectArrayCreator implements RandomizerCreator<BigObject> {
    @Override
    public BigObject[] createRandomArray(int size, Random random) {
      BigObject[] array = new BigObject[size];
      for (int i = 0; i < size; i++) {
        array[i] = new BigObject(random.nextInt(), "Name" + random.nextInt(), random.nextDouble());
      }
      return array;
    }
  }

  static class BigObject implements Comparable<BigObject> {
    int id;
    String name;
    double value;

    BigObject(int id, String name, double value) {
      this.id = id;
      this.name = name;
      this.value = value;
    }

    @Override
    public int compareTo(BigObject other) {
      return Integer.compare(this.id, other.id);
    }
  }
}
