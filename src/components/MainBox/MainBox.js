import styles from "./MainBox.module.css";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material/";
import { useState } from "react";

import Popup from "../Popup";

function MainBox() {
  const [category, setCategory] = useState("jokes");

  const handleChange = (event, newCategory) => {
    if (!newCategory) {
      return;
    }
    setCategory(newCategory);
  };

  const [blacklist, setBlacklist] = useState({
    religious: true,
    racist: true,
    explicit: true,
  });

  const handleBlacklistChange = (event) => {
    setBlacklist({
      ...blacklist,
      [event.target.name]: event.target.checked,
    });
  };

  const { religious, racist, explicit } = blacklist;

  const generate = () => console.log("Generating..");

  return (
    <form className={styles.MainBox} elevation={0} onSubmit={generate}>
      <h1>Heh Heh Generator</h1>
      <h4 className="Tagline">
        A simple generator that brings you more heh heh!
      </h4>
      <br />
      <h4>Type</h4>
      <ToggleButtonGroup
        color="primary"
        value={category}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="jokes" variant="contained">
          Jokes
        </ToggleButton>
        <ToggleButton value="pick-up-lines">Pick-up Lines</ToggleButton>
        <ToggleButton value="facts">Facts</ToggleButton>
      </ToggleButtonGroup>
      <br />
      <h4>Blacklist</h4>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          control={
            <Checkbox
              color="error"
              checked={religious}
              onChange={handleBlacklistChange}
              name="religious"
            />
          }
          label="Religious"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="error"
              checked={racist}
              onChange={handleBlacklistChange}
              name="racist"
            />
          }
          label="Racist"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="error"
              checked={explicit}
              onChange={handleBlacklistChange}
              name="explicit"
            />
          }
          label="Explicit"
        />
      </FormGroup>
      <Popup category={category} blacklist={blacklist} />
    </form>
  );
}

export default MainBox;
