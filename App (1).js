<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hospital Appointment System</title>
<style>
body { font-family: Arial; margin: 20px; }
.hidden { display: none; }
input, select, button { margin: 5px 0; padding: 5px; }
</style>
</head>
<body>

<h2>Login</h2>
<div id="loginDiv">
    <label>Username: <input type="text" id="username"></label><br>
    <label>Password: <input type="password" id="password"></label><br>
    <label>Role:
        <select id="role">
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
        </select>
    </label><br>
    <button onclick="login()">Login</button>
</div>

<div id="patientDiv" class="hidden">
    <h2>Patient Dashboard</h2>
    <label>Name: <input type="text" id="pName"></label><br>
    <label>Age: <input type="number" id="pAge"></label><br>
    <label>Place: <input type="text" id="pPlace"></label><br>
    <label>Health Issue: <input type="text" id="pCause"></label><br>
    <label>Doctor:
        <select id="doctorSelect"></select>
    </label><br>
    <label>Appointment Date & Time: <input type="datetime-local" id="apptTime"></label><br>
    <button onclick="bookAppointment()">Book Appointment</button>
    <h3>Your Appointments:</h3>
    <ul id="patientAppointments"></ul>
    <button onclick="logout()">Logout</button>
</div>

<div id="doctorDiv" class="hidden">
    <h2>Doctor Dashboard</h2>
    <h3>Your Schedule:</h3>
    <ul id="doctorSchedule"></ul>
    <h3>Patient Details:</h3>
    <ul id="doctorPatients"></ul>
    <button onclick="logout()">Logout</button>
</div>

<script>
const users = {
    alice: { password: '123', role: 'doctor', schedule: [] },
    bob: { password: '123', role: 'doctor', schedule: [] },
    patient1: { password: '123', role: 'patient', appointments: [] }
};

const doctors = ['alice', 'bob'];
const patients = {};
let currentUser = null;

function login() {
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!users[username] || users[username].password !== password || users[username].role !== role) {
        alert("Invalid login!");
        return;
    }

    currentUser = username;
    document.getElementById('loginDiv').classList.add('hidden');

    if (role === 'patient') {
        document.getElementById('patientDiv').classList.remove('hidden');
        populateDoctors();
        showPatientAppointments();
    } else {
        document.getElementById('doctorDiv').classList.remove('hidden');
        showDoctorSchedule();
        showDoctorPatients();
    }
}

function logout() {
    currentUser = null;
    document.getElementById('loginDiv').classList.remove('hidden');
    document.getElementById('patientDiv').classList.add('hidden');
    document.getElementById('doctorDiv').classList.add('hidden');
}

function populateDoctors() {
    const select = document.getElementById('doctorSelect');
    select.innerHTML = '';
    doctors.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc;
        option.text = doc.charAt(0).toUpperCase() + doc.slice(1);
        select.add(option);
    });
}

function bookAppointment() {
    const name = document.getElementById('pName').value;
    const age = document.getElementById('pAge').value;
    const place = document.getElementById('pPlace').value;
    const cause = document.getElementById('pCause').value;
    const doctorName = document.getElementById('doctorSelect').value;
    const time = document.getElementById('apptTime').value;

    if (!name || !age || !place || !cause || !time) {
        alert("Please fill all fields!");
        return;
    }

    if (!patients[currentUser]) {
        patients[currentUser] = { name, age, place, cause, appointments: [] };
    }

    if (!users[doctorName].schedule) users[doctorName].schedule = [];

    if (users[doctorName].schedule.find(a => a.time === time)) {
        alert("Doctor not available!");
        return;
    }

    users[doctorName].schedule.push({ time, patient: currentUser });
    patients[currentUser].appointments.push({ doctor: doctorName, time });
    alert(`Appointment booked with Dr. ${doctorName} at ${time}`);
    showPatientAppointments();
}

function showPatientAppointments() {
    const list = document.getElementById('patientAppointments');
    list.innerHTML = '';
    if (!patients[currentUser]) return;
    patients[currentUser].appointments.forEach(a => {
        const li = document.createElement('li');
        li.textContent = `Dr. ${a.doctor} at ${a.time}`;
        list.appendChild(li);
    });
}

function showDoctorSchedule() {
    const list = document.getElementById('doctorSchedule');
    list.innerHTML = '';
    const doctor = users[currentUser];
    if (!doctor.schedule) return;
    doctor.schedule.forEach(a => {
        const p = patients[a.patient];
        const li = document.createElement('li');
        li.textContent = `Patient: ${p ? p.name : a.patient}, Time: ${a.time}`;
        list.appendChild(li);
    });
}

function showDoctorPatients() {
    const list = document.getElementById('doctorPatients');
    list.innerHTML = '';
    const doctor = users[currentUser];
    if (!doctor.schedule) return;
    doctor.schedule.forEach(a => {
        const p = patients[a.patient];
        if (p) {
            const li = document.createElement('li');
            li.textContent = `Name: ${p.name}, Age: ${p.age}, Place: ${p.place}, Cause: ${p.cause}, Time: ${a.time}`;
            list.appendChild(li);
        }
    });
}
</script>

</body>
</html>