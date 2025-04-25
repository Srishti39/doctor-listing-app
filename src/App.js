import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consultationMode, setConsultationMode] = useState("All");
  const [specialties, setSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState("fee");

  // Static doctor data
  const staticDoctors = [
    {
      name: "Dr. Kshitija Jagdale",
      study: "BAMS",
      experience: 20,
      hospital: "Apollo Hospital",
      location: "Chennai, Tamil Nadu",
      fee: 500,
      specialty: ["General Physician"],
      consultationMode: "In Clinic",
    },
    {
      name: "Dr. Priya Rani",
      study: "BPT, MPT",
      experience: 10,
      hospital: "Apollo Hospital",
      location: "Delhi, Delhi",
      fee: 500,
      specialty: ["Physiotherapist"],
      consultationMode: "Video Consult",
    },
    {
      name: "Dr. Amit Gupta",
      study: "MBBS, MS",
      experience: 16,
      hospital: "XYZ Hospital",
      location: "Mumbai, Maharashtra",
      fee: 1000,
      specialty: ["Cardiologist"],
      consultationMode: "In Clinic",
    },
    {
      name: "Dr. Rahul Verma",
      study: "BDS, MDS",
      experience: 13,
      hospital: "City Clinic",
      location: "Bangalore, Karnataka",
      fee: 800,
      specialty: ["Dentist"],
      consultationMode: "Video Consult",
    },
    {
      name: "Dr. Nisha Saini",
      study: "BPT, MPT",
      experience: 13,
      hospital: "MedCare Hospital",
      location: "Delhi, Delhi",
      fee: 500,
      specialty: ["Physiotherapist"],
      consultationMode: "In Clinic",
    },
    {
      name: "Dr. Priya Rani",
      study: "MBBS, MS",
      experience: 11,
      hospital: "XYZ Hospital",
      location: "Delhi, Delhi",
      fee: 500,
      specialty: ["Paediatrician"],
      consultationMode: "In Clinic",
    },
    {
      name: "Dr. Kshitija Jagdale",
      study: "BDS, MDS",
      experience: 15,
      hospital: "XYZ Hospital",
      location: "Delhi, Delhi",
      fee: 1500,
      specialty: ["Dentist"],
      consultationMode: "In Clinic",
    },
  ];

  // Load doctors on component mount
  useEffect(() => {
    setDoctors(staticDoctors);
    setLoading(false);
  }, []);

  // Handle consultation mode changes
  const handleConsultationModeChange = (event) => {
    setConsultationMode(event.target.value);
  };

  // Handle specialty filter changes
  const handleSpecialtyChange = (event) => {
    const value = event.target.value;
    setSpecialties((prevSpecialties) =>
      prevSpecialties.includes(value)
        ? prevSpecialties.filter((specialty) => specialty !== value)
        : [...prevSpecialties, value]
    );
  };

  // Handle sort option changes
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Filter doctors based on selected criteria
  const filteredDoctors = doctors
    .filter((doctor) => {
      if (consultationMode !== "All" && doctor.consultationMode !== consultationMode) {
        return false;
      }
      if (specialties.length > 0 && !doctor.specialty?.some((s) => specialties.includes(s))) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "fee") {
        return a.fee - b.fee;
      } else if (sortBy === "experience") {
        return b.experience - a.experience;
      }
      return 0;
    });

  return (
    <div className="App">
      {/* Fixed Top Bar */}
      <div className="top-bar">
        Doctor Listing
      </div>

      {/* Search Box */}
      <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search symptoms, doctors, specialists, clinics"
        />
      </div>

      <div className="main-content">
        {/* Filters */}
        <div className="filters">
          <h3>Filters</h3>
          <h4>Consultation Mode</h4>
          <input
            type="radio"
            id="allConsult"
            name="consultationMode"
            value="All"
            onChange={handleConsultationModeChange}
            checked={consultationMode === "All"}
          />
          <label htmlFor="allConsult">All Modes</label>
          <input
            type="radio"
            id="videoConsult"
            name="consultationMode"
            value="Video Consult"
            onChange={handleConsultationModeChange}
            checked={consultationMode === "Video Consult"}
          />
          <label htmlFor="videoConsult">Video Consult</label>
          <input
            type="radio"
            id="inClinic"
            name="consultationMode"
            value="In Clinic"
            onChange={handleConsultationModeChange}
            checked={consultationMode === "In Clinic"}
          />
          <label htmlFor="inClinic">In Clinic</label>

          <h4>Select Specialties</h4>
          {["General Physician", "Dentist", "Physiotherapist", "Cardiologist", "Orthopaedic", "Neurologist"].map((specialty) => (
            <div key={specialty}>
              <input
                type="checkbox"
                id={`filter-specialty-${specialty}`}
                value={specialty}
                onChange={handleSpecialtyChange}
                checked={specialties.includes(specialty)}
              />
              <label htmlFor={`filter-specialty-${specialty}`}>{specialty}</label>
            </div>
          ))}

          <h4>Sort by</h4>
          <select onChange={handleSortChange}>
            <option value="fee">Sort by Fee</option>
            <option value="experience">Sort by Experience</option>
          </select>
        </div>

        {/* Doctor List */}
        <div className="doctor-list">
          {loading ? (
            <p>Loading...</p>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div className="doctor-card" key={index}>
                <h2>{doctor.name}</h2>
                <p>{doctor.specialty.join(", ")}</p>
                <p>Experience: {doctor.experience} Years</p>
                <p>Hospital: {doctor.hospital}</p>
                <p>Location: {doctor.location}</p>
                <p>Consultation Fee: ₹{doctor.fee.toLocaleString()}</p>
                <button className="book-appointment-btn">Book Appointment</button>
              </div>
            ))
          ) : (
            <p>No doctors found with the selected filters</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
