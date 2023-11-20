package ch.usi.experimentation.assignment1;

import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import static java.util.Arrays.sort;

/**
 * Main class to run the benchmark.
 */
public class Main {

  private static ThreadMXBean bean = ManagementFactory.getThreadMXBean();

  /**
   * Main method to run the benchmark.
   * For reproducibility, the random number generator is initialized with a seed.
   *
   * @param args Command line arguments
   */
  public static void main(String[] args) {
    int[] arraySizes = {10, 100, 1000};

    // Initialize the random number generator
    Random random = new Random(20020903);

    // Test cases
    try {
      CSVLogger logger = new CSVLogger("benchmark.csv");
      for (int size : arraySizes) {
        System.out.println("Array Size: " + size + "\n");

        // List of Integers
        benchmarkSort(new IntegerArrayCreator(), size, random, logger);
        System.out.println();

        // List of Strings
        benchmarkSort(new StringArrayCreator(), size, random, logger);
        System.out.println();

        // List of BigObjects
        benchmarkSort(new BigObjectArrayCreator(), size, random, logger);
        System.out.println();
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

  }


  private static final int BENCHMARK_RUNS = 1_000;

  private static <T extends Comparable<T>> void benchmarkSort(
          RandomGenerator<T> r,
          int size,
          Random random,
          CSVLogger logger) throws IOException {

    long totalTimePassPerItem = 0;
    long totalTimePassPerItemSorted = 0;
    long totalTimePassPerItemReverse = 0;

    long totalTimeUntilNoChange = 0;
    long totalTimeUntilNoChangeSorted = 0;
    long totalTimeUntilNoChangeReverse = 0;

    long totalTimeWhileNeeded = 0;
    long totalTimeWhileNeededSorted = 0;
    long totalTimeWhileNeededReverse = 0;

    T[] arrayCopy = r.createRandomArray(size, random);

    // WARMUP: First let it do work on fewer runs
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
      final T[] sortedArray = arrayCopy.clone();
      Arrays.sort(sortedArray);
      final T[] reverseSortedArray = sortedArray.clone();
      Collections.reverse(Arrays.asList(reverseSortedArray));

      // Sort using BubbleSortPassPerItem and measure total time
      BubbleSortPassPerItem<T> sorterPassPerItem = new BubbleSortPassPerItem<>();
      totalTimePassPerItem += measureSortTime(sorterPassPerItem, arrayCopy.clone());
      totalTimePassPerItemSorted += measureSortTime(sorterPassPerItem, sortedArray.clone());
      totalTimePassPerItemReverse += measureSortTime(sorterPassPerItem, reverseSortedArray.clone());

      // Sort using BubbleSortUntilNoChange and measure total time
      BubbleSortUntilNoChange<T> sorterUntilNoChange = new BubbleSortUntilNoChange<>();
      totalTimeUntilNoChange += measureSortTime(sorterUntilNoChange, arrayCopy.clone());
      totalTimeUntilNoChangeSorted += measureSortTime(sorterUntilNoChange, sortedArray.clone());
      totalTimeUntilNoChangeReverse += measureSortTime(sorterUntilNoChange, reverseSortedArray.clone());

      // Sort using BubbleSortWhileNeeded and measure total time
      BubbleSortWhileNeeded<T> sorterWhileNeeded = new BubbleSortWhileNeeded<>();
      totalTimeWhileNeeded += measureSortTime(sorterWhileNeeded, arrayCopy.clone());
      totalTimeWhileNeededSorted += measureSortTime(sorterWhileNeeded, sortedArray.clone());
      totalTimeWhileNeededReverse += measureSortTime(sorterWhileNeeded, reverseSortedArray.clone());
    }

    // Calculate the average time for each sort method
    long averageTimePassPerItem = totalTimePassPerItem / BENCHMARK_RUNS;
    long averageTimePassPerItemSorted = totalTimePassPerItemSorted / BENCHMARK_RUNS;
    long averageTimePassPerItemReverse = totalTimePassPerItemReverse / BENCHMARK_RUNS;

    long averageTimeUntilNoChange = totalTimeUntilNoChange / BENCHMARK_RUNS;
    long averageTimeUntilNoChangeSorted = totalTimeUntilNoChangeSorted / BENCHMARK_RUNS;
    long averageTimeUntilNoChangeReverse = totalTimeUntilNoChangeReverse / BENCHMARK_RUNS;

    long averageTimeWhileNeeded = totalTimeWhileNeeded / BENCHMARK_RUNS;
    long averageTimeWhileNeededSorted = totalTimeWhileNeededSorted / BENCHMARK_RUNS;
    long averageTimeWhileNeededReverse = totalTimeWhileNeededReverse / BENCHMARK_RUNS;

    // Output the results
    System.out.println("Type: " + arrayCopy.getClass().getSimpleName());
    System.out.println("BubbleSortPassPerItem Average Time: " + averageTimePassPerItem + " ns");
    System.out.println("BubbleSortPassPerItemSorted Average Time: " + averageTimePassPerItemSorted + " ns");
    System.out.println("BubbleSortPassPerItemReverse Average Time: " + averageTimePassPerItemReverse + " ns");

    System.out.println("BubbleSortUntilNoChange Average Time: " + averageTimeUntilNoChange + " ns");
    System.out.println("BubbleSortUntilNoChangeSorted Average Time: " + averageTimeUntilNoChangeSorted + " ns");
    System.out.println("BubbleSortUntilNoChangeReverse Average Time: " + averageTimeUntilNoChangeReverse + " ns");

    System.out.println("BubbleSortWhileNeeded Average Time: " + averageTimeWhileNeeded + " ns");
    System.out.println("BubbleSortWhileNeeded AverageSorted Time: " + averageTimeWhileNeededSorted + " ns");
    System.out.println("BubbleSortWhileNeeded AverageReverse Time: " + averageTimeWhileNeededReverse + " ns");

    logger.logBenchmark(arrayCopy.getClass().getSimpleName(), "BubbleSortPassPerItem", "random",
            String.valueOf(size), String.valueOf(averageTimePassPerItem));
    logger.logBenchmark(arrayCopy.getClass().getSimpleName(), "BubbleSortPassPerItem", "sorted",
            String.valueOf(size), String.valueOf(averageTimePassPerItemSorted));
    logger.logBenchmark(arrayCopy.getClass().getSimpleName(), "BubbleSortPassPerItem", "reverse",
            String.valueOf(size), String.valueOf(averageTimePassPerItemReverse));

    logger.logBenchmark(arrayCopy.getClass().getSimpleName(), "BubbleSortUntilNoChange", "random",
            String.valueOf(size), String.valueOf(averageTimeUntilNoChange));
    logger.logBenchmark(arrayCopy.getClass().getSimpleName(), "BubbleSortUntilNoChange", "sorted",
            String.valueOf(size), String.valueOf(averageTimeUntilNoChangeSorted));
    logger.logBenchmark(arrayCopy.getClass().getSimpleName(), "BubbleSortUntilNoChange", "reverse",
            String.valueOf(size), String.valueOf(averageTimeUntilNoChangeReverse));

    logger.logBenchmark(arrayCopy.getClass().getSimpleName(), "BubbleSortWhileNeeded", "random",
            String.valueOf(size), String.valueOf(averageTimeWhileNeeded));
    logger.logBenchmark(arrayCopy.getClass().getSimpleName(), "BubbleSortWhileNeeded", "sorted",
            String.valueOf(size), String.valueOf(averageTimeWhileNeededSorted));
    logger.logBenchmark(arrayCopy.getClass().getSimpleName(), "BubbleSortWhileNeeded", "reverse",
            String.valueOf(size), String.valueOf(averageTimeWhileNeededReverse));
  }


  private static <T extends Comparable<T>> long measureSortTime(Sorter<T> sorter, T[] array) {
    long startTime = bean.getCurrentThreadCpuTime();
    sorter.sort(array);
    long endTime = bean.getCurrentThreadCpuTime();
    return endTime - startTime;
  }

  static class IntegerArrayCreator implements RandomGenerator<Integer> {
    @Override
    public Integer[] createRandomArray(int size, Random random) {
      Integer[] array = new Integer[size];
      for (int i = 0; i < size; i++) {
        array[i] = random.nextInt(1_000_000);
      }
      return array;
    }
  }

  static class StringArrayCreator implements RandomGenerator<String> {
    @Override
    public String[] createRandomArray(int size, Random random) {
      String[] array = new String[size];
      for (int i = 0; i < size; i++) {
        array[i] = RandomUtils.randomString(10, random);
      }
      return array;
    }
  }

  static class BigObjectArrayCreator implements RandomGenerator<BigObject> {
    @Override
    public BigObject[] createRandomArray(int size, Random random) {
      BigObject[] array = new BigObject[size];
      for (int i = 0; i < size; i++) {
        List<String> overhead = new ArrayList<>();
        for (int j = 0; j < 100; j++) {
          overhead.add(RandomUtils.randomString(10, random));
        }
        array[i] = new BigObject(random.nextInt(), overhead);
      }
      return array;
    }
  }

}
