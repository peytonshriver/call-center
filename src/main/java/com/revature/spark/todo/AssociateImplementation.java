package com.revature.spark.todo;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.revature.spark.beans.Call;
import com.revature.spark.beans.User;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Peyton Shriver;
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
		double sumCallTimes = calls.get(0).getCallTime();
		for (int i=1; i<calls.size(); i++) { // iterates through list of calls
			sumCallTimes += calls.get(i).getCallTime(); // adds call time of each index to the sum
		}
		return sumCallTimes;
	}

	/**
	 * Find the lowest call time out of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double min(List<Call> calls) {
		double lowestTime = calls.get(0).getCallTime(); //initial lowest time is the time value of index 0 in the calls list
		for (int i = 1; i<calls.size(); i++) { //for loop that iterates through the list getting the time value for each index
			if(calls.get(i).getCallTime() < lowestTime) // compares lowestTime to the call time of current index
				lowestTime = calls.get(i).getCallTime(); // replaces lowestTime with the time of current index in list of calls if true
		}		
		return lowestTime;
	}

	/**
	 * Find the highest call time out of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double max(List<Call> calls) {
		double highestTime = calls.get(0).getCallTime();
		for (int i = 1; i<calls.size(); i++) { //for loop that iterates through the list getting the time value for each index
			if(calls.get(i).getCallTime() > highestTime) // compares highestTime to the call time of current index
				highestTime = calls.get(i).getCallTime(); // replaces highestTime with the time of current index in list of calls if true
		}		
		return highestTime;
	}
	
	/**
	 * Find the average call time of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double avg(List<Call> calls) {
		return (sum(calls))/(calls.size()); //gets the sum of all calls then divides by the number of calls in the list
	}

	/**
	 * Find the median call time of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double median(List<Call> calls) {
		double[] timeArr = new double[calls.size()];
		for(int i = 0; i<calls.size(); i++) {
			timeArr[i] = calls.get(i).getCallTime();
		}
		dubArrBubSort(timeArr);
		double medTime = 0.0;
		if(timeArr.length%2 == 0) {
			medTime = (timeArr[timeArr.length/2]+timeArr[(timeArr.length/2)-1])/2;
		}else {
			medTime = timeArr[((timeArr.length)-1)/2];
		}
		return medTime;
	}
	
	private static void dubArrBubSort(double[] timeArr) {//helper function
		double temp = 0.0;
		boolean notSorted = true;
		while(notSorted) {
			notSorted = false;
			for(int i = 0; i<timeArr.length-1; i++) {
				if (timeArr[i] > timeArr[i+1]) {
					temp = timeArr[i];
					timeArr[i] = timeArr[i+1];
					timeArr[i+1] = temp;
					notSorted = true;
				}
			}
		}
		return;
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
		Map<User, Double> avgCallTimeMap = new HashMap<User,Double>();//Map is an interface, needed to import HashMap
		User currentUser = new User();
		int numOfCalls;
		double totalcallTime;
		for(int x = 0; x<calls.size(); x++) {
			numOfCalls = 0;
			totalcallTime = 0.0;
			currentUser = calls.get(x).getUser();
			if(avgCallTimeMap.containsKey(currentUser))
					continue;
			for(int i=0; i<calls.size(); i++) {
				if(currentUser.getId() == calls.get(i).getUser().getId()) {
					totalcallTime += calls.get(i).getCallTime();
					numOfCalls++;
				}
			}
			avgCallTimeMap.put(currentUser, (totalcallTime/numOfCalls));
		}
		
		return avgCallTimeMap;
	}

}
