package ch.usi.experimentation.assignment1;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Scanner;

public final class CSVLogger {
  private static final String HEADERS = "type,algorithm,array,size,time";
  private final String filename;
  public CSVLogger(final String filename) throws IOException {
    this.filename = filename;
    init();
  }

  /**
   * Initialize the logger.
   *
   * @throws IOException If an error occurs while writing to the file
   */
  public void init() throws IOException {
    File f = new File(filename);

    if (!f.exists()) {
      log(HEADERS);
      return;
    }

    System.out.println("File " + filename + " already exists." + "Do you want to overwrite it (y/N)?");
    try (Scanner scanner = new Scanner(System.in)) {

      if (scanner.hasNextLine()) {
        String answer = scanner.nextLine();
        if (!answer.equals("y")) {
          System.out.println("Aborting.");
          System.exit(0);
          return;
        }
      }

      Files.delete(f.toPath());
      log(HEADERS);
    }
  }

  /**
   * Log a benchmark result.
   *
   * @param type The type of the object the array has (int, String, BigObject)
   * @param algorithm The algorithm used to sort the array: BubbleSort implementations
   * @param array The type of array (random, sorted, reverse)
   * @param size The size of the array
   * @param time The time it took to sort the array
   * @throws IOException If an error occurs while writing to the file
   */
  public void logBenchmark(final String type,
                  final String algorithm,
                  final String array,
                  final String size,
                  final String time) throws IOException {
    log(type + "," + algorithm + "," + array + "," + size + "," + time.replace(",", ""));
  }

  /**
   * Log a message.
   *
   * @param message The message to log
   * @throws IOException If an error occurs while writing to the file
   */
  private void log(final String message) throws IOException {
    try (FileWriter fWriter = new FileWriter(filename, true)) {
      fWriter.write(message + "\n");
    } catch (IOException e) {
      throw new IOException("Error writing to file " + filename, e);
    }
  }
}
