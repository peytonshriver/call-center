package com.revature.spark.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.spark.beans.Call;
import com.revature.spark.services.CallService;

@RestController
public class CallController {

	@Autowired
	private CallService service;
	
	@GetMapping("/call/all")
	public ResponseEntity<List<Call>> findAll(){
		return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
	}

	@PostMapping("/call")
	public ResponseEntity<Call> create(@Valid @RequestBody Call call){
		return new ResponseEntity<>(service.create(call), HttpStatus.CREATED);
	}

	@PutMapping("/call")
	public ResponseEntity<Call> update(@Valid @RequestBody Call call){
		return new ResponseEntity<>(service.update(call), HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("/call")
	public ResponseEntity<Void> delete(@Valid @RequestBody Call call){
		service.delete(call);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/call/sum")
	public ResponseEntity<Double> sum(){
		return new ResponseEntity<>(service.sum(), HttpStatus.OK);
	}
	
	@GetMapping("/call/min")
	public ResponseEntity<Double> min(){
		return new ResponseEntity<>(service.min(), HttpStatus.OK);
	}
	
	@GetMapping("/call/max")
	public ResponseEntity<Double> max(){
		return new ResponseEntity<>(service.max(), HttpStatus.OK);
	}
	
	@GetMapping("/call/avg")
	public ResponseEntity<Double> avg(){
		return new ResponseEntity<>(service.avg(), HttpStatus.OK);
	}
	
	@GetMapping("/call/median")
	public ResponseEntity<Double> median(){
		return new ResponseEntity<>(service.median(), HttpStatus.OK);
	}
	
}
