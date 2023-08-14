import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../store/cafeAction";
import EmployeeService, { EmployeeGender, EmployeePut, EmployeeResponse } from "../../services/employeeService";
import CafeService, { CafeResponse } from "../../services/cafeService";

// export interface EmployeeModal extends EmployeePut {
//   cafeName?: string;
// }
const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const editMode = searchParams.get("edit") === "true";
  const state = useSelector((state) => state);

  const [loading, setLoading] = React.useState(false);
  const [cafes, setCafes] = React.useState<CafeResponse[]>([]);
  const [form, setForm] = React.useState<EmployeeResponse>({
    name: "",
    email: "",
    phone: 0,
    gender: EmployeeGender.None,
    startDate: new Date(),
    id: "",
    daysWorked: 0,
    cafe: "",
  });

  React.useEffect(() => {
    CafeService.getCafes().then((res) => {
      setCafes(res);
    });
  }, []);

  React.useEffect(() => {
    if (editMode) {
      var employeeReducer = (state as any).EmployeeReducer;
      var employeeResponse = (employeeReducer as any).employeeResponse;
      setForm(employeeResponse);
    }
  }, [editMode]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editMode) {
        await EmployeeService.putEmployee(form);
        dispatch(deleteItem());
      } else {
        await EmployeeService.postEmployee(form);
      }
      navigate("/employees");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const formValidation = () => {
    return (
      form.name.length > 0 &&
      form.email.length > 0 &&
      form.phone.toString().length === 8 &&
      emailValidation(form.email) &&
      (form.phone.toString()[0] === "8" || form.phone.toString()[0] === "9")
    );
  };

  const onCancel = () => {
    navigate("/employees");
  };

  const emailValidation = (txt: string) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(txt);
  };

  return (
    <Grid style={{ paddingTop: 20 }} container spacing={2} direction={"column"} alignContent={"center"}>
      <Grid item>
        <TextField
          label={"Name"}
          value={form.name}
          error={form.name.length <= 0}
          onChange={(e: any) => {
            setForm({ ...form, name: e.target.value });
          }}
        ></TextField>
      </Grid>
      <Grid item>
        <TextField
          label={"Email"}
          type="email"
          value={form.email}
          error={form.email.length <= 0 || !emailValidation(form.email)}
          onChange={(e: any) => {
            setForm({ ...form, email: e.target.value });
          }}
        ></TextField>
      </Grid>
      <Grid item>
        <TextField
          label={"Phone"}
          value={form.phone}
          error={
            form.phone.toString().length !== 8 || (form.phone.toString()[0] !== "8" && form.phone.toString()[0] !== "9")
          }
          onChange={(e: any) => {
            setForm({ ...form, phone: e.target.value });
          }}
        ></TextField>
      </Grid>
      <Grid item>
        <Autocomplete
          renderInput={(params) => <TextField {...params} label="Cafe" />}
          value={{ label: form.cafe, id: form.cafeId }}
          options={cafes.map((c) => ({ label: c.name, id: c.id }))}
          //error={form.phone.toString().length != 8}
          onChange={(e: any, newValue: any) => {
            console.log(newValue);
            setForm({ ...form, cafe: newValue.label, cafeId: newValue.id });
          }}
        ></Autocomplete>
      </Grid>

      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="warning" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            {loading ? (
              <>Loading...</>
            ) : (
              <Button variant="contained" disabled={!formValidation()} onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateEmployee;
