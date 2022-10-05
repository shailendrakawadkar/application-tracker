import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./AddNewForm.css";
import { Container } from "@mui/material";
import Header from "../header/Header";
import axios from "axios";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const AddNewApplication = () => {
    const mt20 = {
        marginTop : 20
    }
  
  let navigate = useNavigate();
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [maxPackage, setMaxPackage] = useState(0);

  const [roleError, setRoleError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [maxPackageError, setMaxPackageError] = useState(false);

  let createApplication = (e) => {
    e.preventDefault();

    if (role.trim() === '' || company.trim() === '' || maxPackage.trim() === '') {
      if(role.trim() === '') setRoleError(true);
      if(company.trim() === '') setCompanyError(true);
      if(maxPackage.trim() === '') setMaxPackageError(true);
    } else {
      axios
        .post(API_URL + "application", { role, company, maxPackage }, {
            headers : {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then((response) => {
          if(response.data.successful)
          {
            navigate('/applications');
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container>
      <Header />
      <form noValidate autoComplete="off" onSubmit={createApplication}>
        <TextField
          style={mt20}
          label="Job Role"
          onChange={(e) => {
            e.target.value.trim() === "" ? setRoleError(true) : setRoleError(false);
            setRole(e.target.value);
          }}
          required
          variant="outlined"
          error={roleError}
          fullWidth
        />
        {roleError && <span>Please enter valid data.</span>}
        <TextField
          style={mt20}
          onChange={(e) => {
            e.target.value.trim() === "" ? setCompanyError(true) : setCompanyError(false);
            setCompany(e.target.value);
          }}
          label="Company Name"
          required
          variant="outlined"
          error={companyError}
          fullWidth
        />
        {companyError && <span>Please enter valid data.</span>}
        <TextField
          style={mt20}
          onChange={(e) => {
            e.target.value.trim() === "" ? setMaxPackageError(true) : setMaxPackageError(false);
            setMaxPackage(e.target.value);
          }}
          label="Maximum Package Offering"
          required
          variant="outlined"
          error={maxPackageError}
          fullWidth
        />
        {maxPackageError && <span>Please enter valid data.</span>}
        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: 20,
            float : "right"
          }}
        >
          Create
        </Button>
      </form>
    </Container>
  );
};

export default AddNewApplication;
