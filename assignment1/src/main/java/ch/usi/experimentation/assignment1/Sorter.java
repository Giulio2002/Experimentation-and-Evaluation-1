package ch.usi.experimentation.assignment1;

interface Sorter<T extends Comparable<T>> {
	
	void sort(T[] items);
	
}
