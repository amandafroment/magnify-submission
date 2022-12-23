import { useState, useEffect } from "react";
import * as formsAPI from "../../utilities/forms-api";
import * as homeAPI from "../../utilities/home-api";
import { useNavigate } from "react-router-dom";

export default function LandingPage({ user, setUser }) {
  const [error, setError] = useState("");
  const [submission, setSubmission] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    department: "",
    employment_status: "",
    email: "",
    accommodation_requests: "",
  });

  useEffect(() => {
    // Update the document title using the browser API
    setSubmission(homeAPI.getHomeData());
    console.log(submission);
  }, []);

  const navigate = useNavigate();

  function handleChangeForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    try {
      let form = await formsAPI.createForm(formData);
      setFormData(formData);
      console.log("data submitted");
    } catch (err) {
      setError("Form Submission Failed - Try Again");
    }
  }

  return (
    <>
      <div>
        {user.is_hr ? (
          <>
            <div>
              <h1>Landing Page - HR </h1>
            </div>
          </>
        ) : (
          <>
            <div>
              <h1>Workplace Accommodation Form</h1>
            </div>
            <div>
              <form onSubmit={handleSubmitForm}>
                <label>Full Name: </label>
                <input
                  type="text"
                  value={formData.name}
                  name="name"
                  onChange={handleChangeForm}
                  // required
                />
                <label>Employee ID: </label>
                <input
                  type="text"
                  value={formData.employee_id}
                  name="employee_id"
                  onChange={handleChangeForm}
                  // required
                />
                <label>Department: </label>
                <input
                  type="text"
                  value={formData.department}
                  name="department"
                  onChange={handleChangeForm}
                  // required
                />
                <label>Employment Status: </label>
                <input
                  type="text"
                  value={formData.employment_status}
                  name="employment_status"
                  onChange={handleChangeForm}
                  // required
                />
                <label>Email: </label>
                <input
                  type="text"
                  value={formData.email}
                  name="email"
                  onChange={handleChangeForm}
                  // required
                />
                <label>Accommodation Requests: </label>
                <input
                  type="text"
                  value={formData.accommodation_requests}
                  name="accommodation_requests"
                  onChange={handleChangeForm}
                  // required
                />
                <button type="submit">Submit My Accommodation Form</button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
