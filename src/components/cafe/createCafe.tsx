import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import CafeService, { CafePut } from "../../services/cafeService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateCafe: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const editMode = searchParams.get("edit") === "true";
  const state = useSelector((state) => state);

  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState<CafePut>({
    name: "",
    description: "",
    location: "",
    id: "",
  });

  React.useEffect(() => {
    if (editMode) {
      var cafe = (state as any).cafePut;
      setForm(cafe);
    }
  }, [editMode]);

  const handleSubmit = async () => {
    setLoading(true);
    if (editMode) {
      await CafeService.putCafe(form);
    } else {
      await CafeService.postCafe(form);
    }
    setLoading(false);
    navigate("/cafes");
  };

  const formValidation = () => {
    return form.name.length > 0 && form.description.length > 0 && form.location.length > 0;
  };

  const onCancel = () => {
    navigate("/cafes");
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
          label={"Description"}
          value={form.description}
          error={form.description.length <= 0}
          onChange={(e: any) => {
            setForm({ ...form, description: e.target.value });
          }}
        ></TextField>
      </Grid>
      <Grid item>
        <TextField
          label={"Location"}
          value={form.location}
          error={form.location.length <= 0}
          onChange={(e: any) => {
            setForm({ ...form, location: e.target.value });
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

export default CreateCafe;
