import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    gender: "",
    course: "Flutter",
    skills: [],
    country: "USA",
    address: "",
    website: "https://example.com",
    time: "",
    color: "#000000",
    experience: 0,
    photo: null,
    terms: false
  });

  const handleChange = (e) => {

    const { name, value, type, checked, files } = e.target;

    if (name === "skills") {

      setFormData({
        ...formData,
        skills: checked
          ? [...formData.skills, value]
          : formData.skills.filter((skill) => skill !== value)
      });

    } else if (type === "checkbox") {

      setFormData({
        ...formData,
        [name]: checked
      });

    } else if (type === "file") {

      setFormData({
        ...formData,
        [name]: files[0]
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });
    }
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.terms) {
      alert("Please accept Terms and Conditions");
      return;
    }

    console.log(formData);
    alert("Registration Successful 🎉");
  };


  const handleReset = () => {

    setFormData({
      fullName: "",
      email: "",
      password: "",
      age: "",
      dob: "",
      gender: "",
      course: "Flutter",
      skills: [],
      country: "USA",
      address: "",
      website: "https://example.com",
      time: "",
      color: "#000000",
      experience: 0,
      photo: null,
      terms: false
    });
  };


  return (
    <div className="registration-page">

      <div className="registration-container">

        <h1>Registration Form</h1>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>


          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>


          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>


          {/* Age */}
          <div className="form-group">
            <label>Age</label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>


          {/* Date of Birth */}
          <div className="form-group">
            <label>Date of Birth</label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>


          {/* Gender */}
          <div className="form-group">

            <label>Gender</label>

            <div className="radio-group">

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                />
                Female
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                />
                Other
              </label>

            </div>

          </div>


          {/* Course */}
          <div className="form-group">

            <label>Select Course</label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option>Flutter</option>
              <option>React</option>
              <option>Java</option>
              <option>Python</option>
              <option>MERN</option>
            </select>

          </div>


          {/* Skills */}
          <div className="form-group">

            <label>Skills</label>

            <div className="skills-group">

              {["Java", "React", "Python", "Flutter"].map((skill) => (

                <label key={skill}>

                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleChange}
                  />

                  {skill}

                </label>

              ))}

            </div>

          </div>


          {/* Country */}
          <div className="form-group">

            <label>Country</label>

            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option>USA</option>
              <option>India</option>
              <option>UK</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>

          </div>


          {/* Address */}
          <div className="form-group">

            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />

          </div>


          {/* Website */}
          <div className="form-group">

            <label>Website</label>

            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />

          </div>


          {/* Preferred Time */}
          <div className="form-group">

            <label>Preferred Time</label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />

          </div>


          {/* Favorite Color */}
          <div className="form-group color-row">

            <label>Favorite Color</label>

            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />

          </div>


          {/* Experience */}
          <div className="form-group">

            <label>
              Experience: {formData.experience} Years
            </label>

            <input
              type="range"
              name="experience"
              min="0"
              max="20"
              value={formData.experience}
              onChange={handleChange}
            />

          </div>


          {/* Upload */}
          <div className="form-group">

            <label>Upload Photo</label>

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />

          </div>


          {/* Terms */}
          <div className="terms">

            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />

            <span>
              I agree to the Terms and Conditions
            </span>

          </div>


          {/* Buttons */}
          <div className="button-group">

            <button type="submit" className="register-btn">
              Register
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RegistrationForm;