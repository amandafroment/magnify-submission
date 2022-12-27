import { useEffect, useState } from "react";
import * as formsAPI from "../../utilities/forms-api";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";

export default function LandingPage({ user, submissions, setSubmissions }) {
  const [error, setError] = useState("");

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [rows, setRows] = useState(submissions);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    // Update the document title using the browser API
    setRows(submissions);
  }, [submissions]);

  const requestSearch = (searchedVal) => {
    const filteredRows = submissions.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    department: "",
    employment_status: "",
    email: "",
    accommodation_requests: "",
    file: null,
  });

  const [search, setSearch] = useState("");

  function handleChangeForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  function handleFileChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setIsFilePicked(true);
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", formData.file);
      data.append("name", formData.name);
      data.append("employee_id", formData.employee_id);
      data.append("department", formData.department);
      data.append("employment_status", formData.employment_status);
      data.append("email", formData.email);
      data.append("accommodation_requests", formData.accommodation_requests);
      let response = await formsAPI.createForm(data);

      console.log("data submitted");
      console.log("submission: ", submissions[0], response);
      setSubmissions([...submissions, response]);
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
      <div className="LandingPage">
        {user.is_hr ? (
          <>
            <div>
              <h1>Landing Page - HR </h1>
            </div>
            {/* <input
              type="text"
              value={search}
              placeholder="Search employee accommodations..."
              onChange={handleSearchChange}
            /> */}
          </>
        ) : (
          <>
            <div className="workplace-container">
              <div className="header">
                <h1>WORKPLACE ACCOMMODATION FORM</h1>
              </div>
              <div className="workplace-form-container">
                <form onSubmit={handleSubmitForm} className="workplace-form">
                  <label className="label">FULL NAME: </label>
                  <input
                    type="text"
                    value={formData.name}
                    name="name"
                    onChange={handleChangeForm}
                    required
                  />
                  <label>EMPLOYEE ID: </label>
                  <input
                    type="text"
                    value={formData.employee_id}
                    name="employee_id"
                    onChange={handleChangeForm}
                    required
                  />
                  <label>DEPARTMENT: </label>
                  <input
                    type="text"
                    value={formData.department}
                    name="department"
                    onChange={handleChangeForm}
                    required
                  />
                  <label>EMPLOYMENT STATUS: </label>
                  <input
                    type="text"
                    value={formData.employment_status}
                    name="employment_status"
                    onChange={handleChangeForm}
                    required
                  />
                  <label>EMAIL: </label>
                  <input
                    type="text"
                    value={formData.email}
                    name="email"
                    onChange={handleChangeForm}
                    required
                  />
                  <label>ACCOMMODATION REQUEST: </label>
                  <input
                    type="text"
                    value={formData.accommodation_requests}
                    name="accommodation_requests"
                    onChange={handleChangeForm}
                    required
                  />
                  <input
                    type="file"
                    name="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  <button type="submit" className="form-submit">
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        <Paper>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <TableContainer>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Employee ID</TableCell>
                  <TableCell align="right">Department</TableCell>
                  <TableCell align="right">Employment Status</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Accommodation Requests</TableCell>
                  <TableCell align="right">Uploaded File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.employee_id}</TableCell>
                    <TableCell align="right">{row.department}</TableCell>
                    <TableCell align="right">{row.employment_status}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      {row.accommodation_requests}
                    </TableCell>
                    <TableCell align="right">{row.fileName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}
