import Popup from "reactjs-popup";
import { Button, ButtonGroup } from "@mui/material/";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import styles from "./Popup.module.css";

import JokeDataService from "../../services/joke";
import HehHehGenerator from "../../services/heh-heh-generator";

const BackButton = styled(Button)({
  padding: "6px 36px",
  borderColor: "#0063cc",
  border: "1px solid",
});

const TellAnotherButton = styled(Button)({
  padding: "6px 34px",
});

export default function PopUp(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("You're the joke!");

  const { category, blacklist } = props;

  const generateResult = (e) => {
    e.preventDefault();
    if (category === "jokes") {
      retrieveJoke();
    } else if (category === "pick-up-lines") {
      retrievePickUpLine();
    } else if (category === "facts") {
      retrieveFact();
    } else {
      console.warn(`Generate result: category is ${category}`);
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  const retrieveJoke = () => {
    JokeDataService.getJoke(blacklist)
      .then((response) => {
        if (response.data.type === "single") {
          setText(response.data.joke, setOpen(true));
        } else {
          setText(
            response.data.setup + " " + response.data.delivery,
            setOpen(true)
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrievePickUpLine = () => {
    HehHehGenerator.getPickUpLines(blacklist)
      .then((response) => {
        setText(
          response.data.text + (response.data.delivery ?? ""),
          setOpen(true)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveFact = () => {
    HehHehGenerator.getFact(blacklist)
      .then((response) => {
        setText(response.data.text, setOpen(true));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <button className={styles.generateButton} onClick={generateResult}>
        Generate
      </button>
      <Popup open={open} modal={true} onClose={closeModal}>
        {(close) => (
          <div>
            <h2>{text}</h2>
            <ButtonGroup>
              <BackButton
                onClick={() => {
                  close();
                }}
              >
                Back
              </BackButton>
              <TellAnotherButton variant="contained" onClick={generateResult}>
                Tell me another
              </TellAnotherButton>
            </ButtonGroup>
          </div>
        )}
      </Popup>
    </>
  );
}
