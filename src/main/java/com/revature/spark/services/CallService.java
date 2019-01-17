package com.revature.spark.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.spark.beans.Call;
import com.revature.spark.beans.User;
import com.revature.spark.repository.CallRepository;
import com.revature.spark.repository.UserRepository;
import com.revature.spark.todo.AssociateImplementation;

@Service
public class CallService {
	
	/**
	 * In Spring, we would likely @Autowired this property. Just to keep the
	 * associate code free of Spring annotations, we opted to simply instantiate the
	 * old-fashioned way.
	 */
	private AssociateImplementation associateImplementation = new AssociateImplementation();

	@Autowired
	private CallRepository callRepository;

	@Autowired
	private UserRepository userRepository;

	public List<Call> findAll() {
		return callRepository.findAll();
	}

	public Call create(Call call) {
		validateUser(call);
		Optional<Call> toSave = callRepository.findById(call.getId());
		if (toSave.isPresent()) {
			throw new RuntimeException("The record with identifier " + call.getId()
					+ " already exists. Please select a unique identifier.");
		} else {
			return callRepository.save(call);
		}
	}

	public Call update(Call call) {
		validateUser(call);
		Optional<Call> toUpdate = callRepository.findById(call.getId());
		if (toUpdate.isPresent()) {
			Call update = toUpdate.get();
			update.setNotes(call.getNotes());
			update.setResolved(call.isResolved());
			update.setCallTime(call.getCallTime());
			update.setUser(call.getUser());
			return callRepository.save(update);
		} else {
			throw new RuntimeException("The record with identifier " + call.getId()
					+ " was not found. You cannot update a record that does not exist.");
		}
	}

	private void validateUser(Call call) {
		Optional<User> user = userRepository.findById(call.getUser().getId());
		if (!user.isPresent()) {
			throw new RuntimeException("User record does not exist.");
		}
	}

	public void delete(Call call) {
		callRepository.delete(call);
	}

	public Double sum() {
		return associateImplementation.sum(callRepository.findAll());
	}

	public Double min() {
		return associateImplementation.min(callRepository.findAll());
	}

	public Double max() {
		return associateImplementation.max(callRepository.findAll());
	}

	public Double avg() {
		return associateImplementation.avg(callRepository.findAll());
	}

	public Double median() {
		return associateImplementation.median(callRepository.findAll());
	}
	
}
