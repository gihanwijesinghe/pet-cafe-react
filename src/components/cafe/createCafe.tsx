import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../store/cafeAction";
import CafeService, { CafePut } from "../../services/cafeService";

const CreateCafe: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

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
      var cafeReducer = (state as any).CafeReducer;
      const cafe = (cafeReducer as any).cafePut;
      if (cafe.id) {
        setForm(cafe);
      } else {
        setSearchParams((params) => {
          params.set("edit", "false");
          return params;
        });
      }
    }
  }, [editMode]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editMode) {
        await CafeService.putCafe(form);
        dispatch(deleteItem());
      } else {
        await CafeService.postCafe(form);
      }
      navigate("/cafesaggrid");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const formValidation = () => {
    return form.name.length > 0 && form.description.length > 0 && form.location.length > 0;
  };

  const onCancel = () => {
    navigate("/cafesaggrid");
  };

  return (
    <Grid style={{ paddingTop: 20 }} container spacing={2} direction={"column"} alignContent={"center"}>
      <h2>{editMode ? "Edit Cafe" : "Create Cafe"}</h2>
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
          error={form.location.toString().length <= 0}
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
