import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import CafeService, { CafePost } from "../../services/cafeService";
import { useNavigate } from "react-router-dom";

const CreateCafe: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState<CafePost>({
    name: "",
    description: "",
    location: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    await CafeService.postCafe(form);
    setLoading(false);
    navigate("/cafes");
  };

  const formValidation = () => {
    return form.name.length > 0 && form.description.length > 0 && form.location.length > 0;
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
        {loading ? (
          <>Loading...</>
        ) : (
          <Button variant="contained" disabled={!formValidation()} onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default CreateCafe;
