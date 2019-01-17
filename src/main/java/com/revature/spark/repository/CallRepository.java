package com.revature.spark.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.spark.beans.Call;

public interface CallRepository extends JpaRepository<Call, Integer>{

}
