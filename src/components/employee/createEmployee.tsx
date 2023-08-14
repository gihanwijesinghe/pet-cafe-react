import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../store/cafeAction";
import EmployeeService, { EmployeeGender, EmployeePut } from "../../services/employeeService";
import { CafePut } from "../../services/cafeService";

const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const editMode = searchParams.get("edit") === "true";
  const state = useSelector((state) => state);

  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState<EmployeePut>({
    name: "",
    email: "",
    phone: 0,
    gender: EmployeeGender.None,
    startDate: new Date(),
    id: "",
  });

  React.useEffect(() => {
    //console.log(JSON.stringify(state));
    if (editMode) {
      var employeeReducer = (state as any).EmployeeReducer;
      setForm((employeeReducer as any).employeePut);
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
    return form.name.length > 0 && form.email.length > 0 && form.phone.toString().length == 8;
  };

  const onCancel = () => {
    navigate("/employees");
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
          error={form.email.length <= 0}
          onChange={(e: any) => {
            setForm({ ...form, email: e.target.value });
          }}
        ></TextField>
      </Grid>
      <Grid item>
        <TextField
          label={"Phone"}
          value={form.phone}
          error={form.phone.toString().length != 8}
          onChange={(e: any) => {
            setForm({ ...form, phone: e.target.value });
          }}
        ></TextField>
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
