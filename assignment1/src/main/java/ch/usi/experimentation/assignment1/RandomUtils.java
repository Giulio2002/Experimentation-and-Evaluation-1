package ch.usi.experimentation.assignment1;


import java.util.Random;

/**
 * Random utils class.
 */
public final class RandomUtils {
  private static final String CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  private RandomUtils() {}

  /**
   * Generates a random string of the given length.
   * Includes alphanumeric lowercase and uppercase characters.
   *
   * @param length The length of the string
   * @param random The random number generator
   * @return The random string
   */
  public static String randomString(final int length, final Random random) {
    final StringBuilder strBuilder = new StringBuilder();

    for (int i = 0; i < length; i++)
      strBuilder.append(CHARSET.charAt(random.nextInt(CHARSET.length())));

    return strBuilder.toString();
  }
}
