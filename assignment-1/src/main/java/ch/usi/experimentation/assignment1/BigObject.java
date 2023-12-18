package ch.usi.experimentation.assignment1;

import java.util.List;
import java.util.Objects;

public class BigObject implements Comparable<BigObject> {
  private final int id;
  private final List<String> overhead;

  BigObject(final int id, final List<String> overhead) {
    this.id = id;
    this.overhead = overhead;
  }

  /**
   * CompareTo method for BigObject.
   * Fundamental in the benchmark to see overhead delays for large objects.
   * Should accentuate efficiency of faster algorithms.
   * Comparing only id, no need to compare overhead as it adds confusion to the experiment
   * and evaluating the speed of overhead comparison is off-topic.
   *
   * @param other the object to be compared.
   * @return a negative integer, zero, or a positive integer as this object has precedence
   */
  @Override
  public int compareTo(final BigObject other) {
    return Integer.compare(this.id, other.id);
  }

  /**
   * Equals method for BigObject.
   * Override for convention, not used in the benchmark.
   *
   * @param o The object to compare to
   * @return True if the objects are equal, false otherwise
   */
  @Override
  public boolean equals(final Object o) {
    if (o == this)
      return true;

    if (!(o instanceof BigObject other))
      return false;

    return this.id == other.id && this.overhead.equals(other.overhead);
  }

  /**
   * Hashcode method for BigObject.
   * Override for convention, not used in the benchmark.
   *
   * @return The hashcode of the object
   */
  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.overhead);
  }
}
