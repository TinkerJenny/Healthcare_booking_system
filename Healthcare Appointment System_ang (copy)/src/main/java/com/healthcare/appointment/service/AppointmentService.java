package com.healthcare.appointment.service;

import com.healthcare.appointment.model.Appointment;
import com.healthcare.appointment.model.AppointmentStatus;
import com.healthcare.appointment.model.User;
import com.healthcare.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppointment(Appointment appointment) {
        // Check if doctor is available at that time
        LocalDateTime startTime = appointment.getAppointmentDateTime();
        LocalDateTime endTime = startTime.plusHours(1); // Assuming 1-hour slots

        List<Appointment> conflicts = appointmentRepository.findDoctorAppointmentsBetween(
                appointment.getDoctor(), startTime, endTime);

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Doctor is not available at this time");
        }

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getPatientAppointments(User patient) {
        return appointmentRepository.findByPatient(patient);
    }

    public List<Appointment> getDoctorAppointments(User doctor) {
        return appointmentRepository.findByDoctor(doctor);
    }

    public Optional<Appointment> findById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment updateAppointment(Appointment appointment) {
        appointment.setUpdatedAt(LocalDateTime.now());
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointmentStatus(Long id, AppointmentStatus status) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            appointment.get().setStatus(status);
            appointment.get().setUpdatedAt(LocalDateTime.now());
            return appointmentRepository.save(appointment.get());
        }
        throw new RuntimeException("Appointment not found");
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public List<Appointment> getAppointmentsByStatus(AppointmentStatus status) {
        return appointmentRepository.findByStatus(status);
    }
}