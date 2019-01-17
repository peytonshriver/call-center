package com.revature.spark;

import static org.junit.Assert.assertEquals;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.junit.BeforeClass;
import org.junit.Test;

import com.revature.spark.beans.Call;
import com.revature.spark.beans.User;
import com.revature.spark.todo.AssociateImplementation;

public class CallCenterApplicationTests {
	
	static AssociateImplementation service = new AssociateImplementation();
	static double precision = 0.01; 
	static List<Call> calls;
	static List<Call> oddcalls;
	
	@BeforeClass
	public static void before() {
		// even calls
		calls = new LinkedList<>();
		calls.add(new Call(1, "a", true, 60, new User(1, "Dan", "Pickles")));
		calls.add(new Call(2, "b", true, 90, new User(1, "Dan", "Pickles")));
		calls.add(new Call(3, "c", true, 90, new User(1, "Dan", "Pickles")));
		calls.add(new Call(4, "d", true, 60, new User(1, "Dan", "Pickles")));
		calls.add(new Call(5, "e", true, 20, new User(1, "Dan", "Pickles")));
		calls.add(new Call(6, "f", true, 40, new User(2, "Randolph", "Scott")));
		calls.add(new Call(7, "g", true, 40, new User(2, "Randolph", "Scott")));
		calls.add(new Call(8, "h", true, 50, new User(2, "Randolph", "Scott")));
		calls.add(new Call(9, "i", true, 70, new User(3, "Howard", "Johnson")));
		calls.add(new Call(10, "j", true, 60, new User(3, "Howard", "Johnson")));
		
		// odd calls
		oddcalls = new LinkedList<>();
		oddcalls.add(new Call(1, "a", true, 60, new User(1, "Dan", "Pickles")));
		oddcalls.add(new Call(4, "d", true, 60, new User(1, "Dan", "Pickles")));
		oddcalls.add(new Call(5, "e", true, 20, new User(1, "Dan", "Pickles")));
		oddcalls.add(new Call(6, "f", true, 40, new User(2, "Randolph", "Scott")));
		oddcalls.add(new Call(7, "g", true, 40, new User(2, "Randolph", "Scott")));
		oddcalls.add(new Call(8, "h", true, 50, new User(2, "Randolph", "Scott")));
		oddcalls.add(new Call(10, "j", true, 60, new User(3, "Howard", "Johnson")));
	} 
	
	@Test
	public void sumTest() {
		double sum = 580;
		double testSum = service.sum(calls);
		assertEquals(sum, testSum, precision);
	}

	@Test
	public void minTest() {
		double min = 20;
		double testMin = service.min(calls);
		assertEquals(min, testMin, precision);
	}

	@Test
	public void maxTest() {
		double max = 90;
		double testMax = service.max(calls);
		assertEquals(max, testMax, precision);
	}

	@Test
	public void avgTest() {
		double avg = 58;
		double testAvg = service.avg(calls);
		assertEquals(avg, testAvg, precision);
	}

	@Test
	public void medianTest() {
		// check even length
		double median = 60;
		double testMedian = service.median(calls);
		assertEquals(median, testMedian, precision);
		
		// check odd length
		median = 50;
		testMedian = service.median(oddcalls);
		assertEquals(median, testMedian, precision);
	}

	@Test
	public void avgCallTimePerUser() {
		Map<User, Double> testTotal = service.avgCallTimePerUser(calls);
		assertEquals(64, testTotal.get(new User(1, "Dan", "Pickles")), precision);
		assertEquals(43.3333, testTotal.get(new User(2, "Randolph", "Scott")), precision);
		assertEquals(65, testTotal.get(new User(3, "Howard", "Johnson")), precision);
	}
}

