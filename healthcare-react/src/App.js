import React, { useState, useEffect } from 'react';
import './App.css';

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

const api = {
  registerUser: (userData) => 
    fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }),
  
  getDoctors: () => fetch(`${API_BASE_URL}/users/doctors`),
  getPatients: () => fetch(`${API_BASE_URL}/users/patients`),
  getUserById: (id) => fetch(`${API_BASE_URL}/users/${id}`),
  updateUser: (id, userData) => 
    fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }),
  deleteUser: (id) => 
    fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' }),
  
  createAppointment: (appointmentData) => 
    fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    }),
  
  getPatientAppointments: (patientId) => 
    fetch(`${API_BASE_URL}/appointments/patient/${patientId}`),
  
  getDoctorAppointments: (doctorId) => 
    fetch(`${API_BASE_URL}/appointments/doctor/${doctorId}`),
  
  updateAppointment: (id, appointmentData) => 
    fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    }),
  
  updateAppointmentStatus: (id, status) => 
    fetch(`${API_BASE_URL}/appointments/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(status)
    }),
  
  deleteAppointment: (id) => 
    fetch(`${API_BASE_URL}/appointments/${id}`, { method: 'DELETE' })
};

// Authentication Component
const LoginForm = ({ onLogin, switchToRegister }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we'll simulate login
    if (credentials.username && credentials.password) {
      onLogin({ username: credentials.username, role: 'ADMIN' });
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <div className="logo-icon">🏥</div>
            <h1>HealthCareSystem</h1>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>

          <div className="auth-switch">
            Don't have an account? 
            <button type="button" onClick={switchToRegister} className="switch-button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Registration Component
const RegisterForm = ({ onRegister, switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'PATIENT',
    specialization: '',
    licenseNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.registerUser(formData);
      if (response.ok) {
        const user = await response.json();
        onRegister(user);
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (err) {
      setError('Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="logo">S
            <div className="logo-icon">🏥</div>
            <h1>HealthCareSystem</h1>
          </div>
          <h2>Create Account</h2>
          <p>Join our healthcare platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-row">
            <div className="input-group">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="input-group">
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>
          </div>

          {formData.role === 'DOCTOR' && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="License Number"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                />
              </div>
            </>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="auth-switch">
            Already have an account? 
            <button type="button" onClick={switchToLogin} className="switch-button">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Dashboard Components
const Header = ({ user, onLogout, activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">🏥</div>
            <h1>HealthCareSystem</h1>
          </div>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <button 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            📅 Appointments
          </button>
          <button 
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
        </nav>

        <div className="header-right">
          <div className="user-info">
            <span>Welcome, {user.username}</span>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className={`stat-card ${color}`}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <h3>{title}</h3>
      <div className="stat-value">{value}</div>
    </div>
  </div>
);

const AppointmentCard = ({ appointment, onEdit, onDelete, onStatusUpdate }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'status-confirmed';
      case 'CANCELLED': return 'status-cancelled';
      case 'COMPLETED': return 'status-completed';
      default: return 'status-pending';
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <div className={`appointment-status ${getStatusClass(appointment.status)}`}>
          {appointment.status}
        </div>
        <div className="appointment-actions">
          <button onClick={() => onEdit(appointment)} className="action-button edit">
            ✏️
          </button>
          <button onClick={() => onDelete(appointment.id)} className="action-button delete">
            🗑️
          </button>
        </div>
      </div>

      <div className="appointment-content">
        <div className="appointment-info">
          <div className="info-row">
            <span className="info-label">👤 Patient:</span>
            <span>{appointment.patient?.firstName} {appointment.patient?.lastName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">🩺 Doctor:</span>
            <span>Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">📅 Date:</span>
            <span>{formatDate(appointment.appointmentDateTime)}</span>
          </div>
          {appointment.reason && (
            <div className="info-row">
              <span className="info-label">📝 Reason:</span>
              <span>{appointment.reason}</span>
            </div>
          )}
        </div>

        {appointment.status === 'PENDING' && (
          <div className="appointment-buttons">
            <button 
              onClick={() => onStatusUpdate(appointment.id, 'CONFIRMED')}
              className="status-button confirm"
            >
              ✅ Confirm
            </button>
            <button 
              onClick={() => onStatusUpdate(appointment.id, 'CANCELLED')}
              className="status-button cancel"
            >
              ❌ Cancel
            </button>
          </div>
        )}

        {appointment.status === 'CONFIRMED' && (
          <div className="appointment-buttons">
            <button 
              onClick={() => onStatusUpdate(appointment.id, 'COMPLETED')}
              className="status-button complete"
            >
              ✔️ Mark Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const UserCard = ({ user, onDelete }) => (
  <div className="user-card">
    <div className="user-avatar">
      {user.role === 'DOCTOR' ? '🩺' : '👤'}
    </div>
    <div className="user-info">
      <h3>{user.role === 'DOCTOR' ? 'Dr. ' : ''}{user.firstName} {user.lastName}</h3>
      <p className="user-role">{user.role}</p>
      <div className="user-details">
        <div>📧 {user.email}</div>
        {user.phone && <div>📱 {user.phone}</div>}
        {user.specialization && <div>🎯 {user.specialization}</div>}
      </div>
    </div>
    <button onClick={() => onDelete(user.id)} className="user-delete">
      🗑️
    </button>
  </div>
);

const AppointmentForm = ({ doctors, patients, onSave, onCancel, editingAppointment }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDateTime: '',
    reason: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingAppointment) {
      const appointmentDate = new Date(editingAppointment.appointmentDateTime);
      const formattedDate = appointmentDate.toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(' ', 'T');

      setFormData({
        patientId: editingAppointment.patient?.id || '',
        doctorId: editingAppointment.doctor?.id || '',
        appointmentDateTime: formattedDate,
        reason: editingAppointment.reason || '',
        notes: editingAppointment.notes || ''
      });
    }
  }, [editingAppointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const appointmentData = {
        patient: { id: parseInt(formData.patientId) },
        doctor: { id: parseInt(formData.doctorId) },
        appointmentDateTime: formData.appointmentDateTime,
        reason: formData.reason,
        notes: formData.notes
      };

      let response;
      if (editingAppointment) {
        response = await api.updateAppointment(editingAppointment.id, appointmentData);
      } else {
        response = await api.createAppointment(appointmentData);
      }

      if (response.ok) {
        const appointment = await response.json();
        onSave(appointment);
      }
    } catch (error) {
      console.error('Failed to save appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{editingAppointment ? 'Edit Appointment' : 'Book New Appointment'}</h2>
          <button onClick={onCancel} className="modal-close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label>Patient</label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({...formData, patientId: e.target.value})}
              required
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Doctor</label>
            <select
              value={formData.doctorId}
              onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              value={formData.appointmentDateTime}
              onChange={(e) => setFormData({...formData, appointmentDateTime: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Reason</label>
            <input
              type="text"
              placeholder="Reason for appointment"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              placeholder="Additional notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows="3"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" disabled={loading} className="save-button">
              {loading ? 'Saving...' : (editingAppointment ? 'Update' : 'Book Appointment')}
            </button>
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'PATIENT',
    specialization: '',
    licenseNumber: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.registerUser(formData);
      if (response.ok) {
        const user = await response.json();
        onSave(user);
      }
    } catch (error) {
      console.error('Failed to save user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New User</h2>
          <button onClick={onCancel} className="modal-close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>
          </div>

          {formData.role === 'DOCTOR' && (
            <>
              <div className="form-group">
                <label>Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>License Number</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                />
              </div>
            </>
          )}

          <div className="form-buttons">
            <button type="submit" disabled={loading} className="save-button">
              {loading ? 'Saving...' : 'Add User'}
            </button>
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [doctorsRes, patientsRes] = await Promise.all([
        api.getDoctors(),
        api.getPatients()
      ]);

      const doctorsData = await doctorsRes.json();
      const patientsData = await patientsRes.json();

      setDoctors(doctorsData);
      setPatients(patientsData);

      // Load appointments
      const allAppointments = [];
      for (const doctor of doctorsData) {
        try {
          const appointmentsRes = await api.getDoctorAppointments(doctor.id);
          if (appointmentsRes.ok) {
            const doctorAppointments = await appointmentsRes.json();
            allAppointments.push(...doctorAppointments);
          }
        } catch (err) {
          console.error(`Failed to load appointments for doctor ${doctor.id}:`, err);
        }
      }
      setAppointments(allAppointments);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAppointmentSave = (appointment) => {
    if (editingAppointment) {
      setAppointments(appointments.map(a => 
        a.id === appointment.id ? appointment : a
      ));
      setEditingAppointment(null);
    } else {
      setAppointments([...appointments, appointment]);
    }
    setShowAppointmentForm(false);
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await api.updateAppointmentStatus(id, status);
      if (response.ok) {
        const updatedAppointment = await response.json();
        setAppointments(appointments.map(a => 
          a.id === id ? updatedAppointment : a
        ));
      }
    } catch (error) {
      console.error('Failed to update appointment status:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const response = await api.deleteAppointment(id);
        if (response.ok) {
          setAppointments(appointments.filter(a => a.id !== id));
        }
      } catch (error) {
        console.error('Failed to delete appointment:', error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await api.deleteUser(id);
        if (response.ok) {
          setDoctors(doctors.filter(d => d.id !== id));
          setPatients(patients.filter(p => p.id !== id));
        }
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleUserSave = (user) => {
    if (user.role === 'DOCTOR') {
      setDoctors([...doctors, user]);
    } else {
      setPatients([...patients, user]);
    }
    setShowUserForm(false);
  };

  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status === 'PENDING').length,
    confirmedAppointments: appointments.filter(a => a.status === 'CONFIRMED').length,
    totalDoctors: doctors.length,
    totalPatients: patients.length
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <div className="page-header">
              <h1>Dashboard Overview</h1>
              <p>Welcome to your healthcare management system</p>
            </div>

            <div className="stats-grid">
              <StatCard 
                icon="📅" 
                title="Total Appointments" 
                value={stats.totalAppointments} 
                color="blue"
              />
              <StatCard 
                icon="⏳" 
                title="Pending" 
                value={stats.pendingAppointments} 
                color="orange"
              />
              <StatCard 
                icon="🩺" 
                title="Doctors" 
                value={stats.totalDoctors} 
                color="green"
              />
              <StatCard 
                icon="👥" 
                title="Patients" 
                value={stats.totalPatients} 
                color="purple"
              />
            </div>

            <div className="recent-appointments">
              <div className="section-header">
                <h2>Recent Appointments</h2>
                <button 
                  onClick={() => setShowAppointmentForm(true)}
                  className="add-button"
                >
                  📅 Book Appointment
                </button>
              </div>
              
              <div className="appointments-grid">
                {appointments.slice(0, 6).map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onEdit={(apt) => {
                      setEditingAppointment(apt);
                      setShowAppointmentForm(true);
                    }}
                    onDelete={handleDeleteAppointment}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="appointments-content">
            <div className="page-header">
              <h1>Appointments</h1>
              <button 
                onClick={() => setShowAppointmentForm(true)}
                className="add-button"
              >
                📅 Book New Appointment
              </button>
            </div>

            <div className="appointments-grid">
              {appointments.map(appointment => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onEdit={(apt) => {
                    setEditingAppointment(apt);
                    setShowAppointmentForm(true);
                  }}
                  onDelete={handleDeleteAppointment}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>

            {appointments.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h3>No appointments yet</h3>
                <p>Book your first appointment to get started</p>
                <button 
                  onClick={() => setShowAppointmentForm(true)}
                  className="add-button"
                >
                  Book Appointment
                </button>
              </div>
            )}
          </div>
        );

      case 'users':
        return (
          <div className="users-content">
            <div className="page-header">
              <h1>Users Management</h1>
              <button 
                onClick={() => setShowUserForm(true)}
                className="add-button"
              >
                👤 Add New User
              </button>
            </div>

            <div className="users-sections">
              <div className="users-section">
                <h2>Doctors ({doctors.length})</h2>
                <div className="users-grid">
                  {doctors.map(doctor => (
                    <UserCard
                      key={doctor.id}
                      user={doctor}
                      onDelete={handleDeleteUser}
                    />
                  ))}
                </div>
              </div>

              <div className="users-section">
                <h2>Patients ({patients.length})</h2>
                <div className="users-grid">
                  {patients.map(patient => (
                    <UserCard
                      key={patient.id}
                      user={patient}
                      onDelete={handleDeleteUser}
                    />
                  ))}
                </div>
              </div>
            </div>

            {doctors.length === 0 && patients.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h3>No users yet</h3>
                <p>Add your first user to get started</p>
                <button 
                  onClick={() => setShowUserForm(true)}
                  className="add-button"
                >
                  Add User
                </button>
              </div>
            )}
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="dashboard">
      <Header 
        user={user} 
        onLogout={onLogout} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="main-content">
        {renderContent()}
      </main>

      {showAppointmentForm && (
        <AppointmentForm
          doctors={doctors}
          patients={patients}
          onSave={handleAppointmentSave}
          onCancel={() => {
            setShowAppointmentForm(false);
            setEditingAppointment(null);
          }}
          editingAppointment={editingAppointment}
        />
      )}

      {showUserForm && (
        <UserForm
          onSave={handleUserSave}
          onCancel={() => setShowUserForm(false)}
        />
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser({ username: userData.username, role: 'ADMIN' });
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
  };

  if (!user) {
    return showLogin ? (
      <LoginForm 
        onLogin={handleLogin} 
        switchToRegister={() => setShowLogin(false)} 
      />
    ) : (
      <RegisterForm 
        onRegister={handleRegister} 
        switchToLogin={() => setShowLogin(true)} 
      />
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default App;
