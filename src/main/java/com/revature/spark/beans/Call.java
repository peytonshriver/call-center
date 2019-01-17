package com.revature.spark.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="call_center_call")
public class Call {

	@Id
	@Column(name="call_id", nullable=false)
	@Min(value=0)
	private int id;
	
	@Column(nullable=false)
	@NotBlank
	private String notes;
	
	@Column(name="is_resolved", nullable=false)
	private boolean resolved;
	
	@Column(name="call_time", nullable=false)
	@Min(value=0)
	private double callTime;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="user_id", nullable=false)
	@NotNull
	private User user;

	public Call() {
		super();
	}

	public Call(@Min(0) int id, @NotBlank String notes, boolean resolved, @Min(0) double callTime, @NotNull User user) {
		super();
		this.id = id;
		this.notes = notes;
		this.resolved = resolved;
		this.callTime = callTime;
		this.user = user;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public boolean isResolved() {
		return resolved;
	}

	public void setResolved(boolean resolved) {
		this.resolved = resolved;
	}

	public double getCallTime() {
		return callTime;
	}

	public void setCallTime(double callTime) {
		this.callTime = callTime;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(callTime);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + id;
		result = prime * result + ((notes == null) ? 0 : notes.hashCode());
		result = prime * result + (resolved ? 1231 : 1237);
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Call other = (Call) obj;
		if (Double.doubleToLongBits(callTime) != Double.doubleToLongBits(other.callTime))
			return false;
		if (id != other.id)
			return false;
		if (notes == null) {
			if (other.notes != null)
				return false;
		} else if (!notes.equals(other.notes))
			return false;
		if (resolved != other.resolved)
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Call [id=" + id + ", notes=" + notes + ", resolved=" + resolved + ", callTime=" + callTime + ", user="
				+ user + "]";
	}
	
}
