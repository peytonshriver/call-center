package com.revature.spark.todo;

import java.util.List;
import java.util.Map;

import com.revature.spark.beans.Call;
import com.revature.spark.beans.User;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Your Name Here
 * 
 */
public class AssociateImplementation {

	/**
	 * Find the sum of all call times. This is the time all employees have spent on
	 * the phone.
	 * 
	 * @param calls
	 * @return
	 */
	public Double sum(List<Call> calls) {
		return null;
	}

	/**
	 * Find the lowest call time out of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double min(List<Call> calls) {
		return null;
	}

	/**
	 * Find the highest call time out of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double max(List<Call> calls) {
		return null;
	}

	/**
	 * Find the average call time of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double avg(List<Call> calls) {
		return null;
	}

	/**
	 * Find the median call time of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double median(List<Call> calls) {
		return null;
	}

	/**
	 * !! BONUS CHALLENGE REQUIREMENT !!
	 * 
	 * Find the average call time for each user.
	 * 
	 * @param calls
	 * @return
	 */
	public Map<User, Double> avgCallTimePerUser(List<Call> calls) {
		return null;
	}

}
