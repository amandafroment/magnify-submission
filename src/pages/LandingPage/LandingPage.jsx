import { useState } from "react";
import * as formsAPI from "../../utilities/forms-api";
import { useNavigate } from "react-router-dom";

export default function LandingPage({ user, submissions, setSubmissions }) {
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    department: "",
    employment_status: "",
    email: "",
    accommodation_requests: "",
  });

  const [search, setSearch] = useState("");

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
      setSubmissions(...submissions, formData);
    } catch (err) {
      setError("Form Submission Failed - Try Again");
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (search.length > 0) {
    submissions.filter((submission) => {
      return submission.name.match(search);
    });
  }

  return (
    <>
      <div>
        {user.is_hr ? (
          <>
            <div>
              <h1>Landing Page - HR </h1>
            </div>
            <input
              type="text"
              value={search}
              placeholder="Search employee accommodations..."
              onChange={handleSearchChange}
            />
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

        {submissions.map((submission, idx) => {
          return (
            <>
              <span>{submission.name}</span>
              <span>{submission.employee_id}</span>
              <span>{submission.employment_status}</span>
              <span>{submission.email}</span>
              <span>{submission.accommodation_requests}</span>
              <br></br>
            </>
          );
        })}
      </div>
    </>
  );
}
