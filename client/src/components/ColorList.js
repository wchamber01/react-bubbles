import React, { useState } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";
// import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors, "colors");
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...colorToEdit.id
    // where is it saved right now?colorToEdit
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data, "put response");
        setEditing(false);
      });
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        updateColors(res.data);
        setEditing(false);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color - by id
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res.data, "del response");
      });
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        updateColors(res.data);
        setEditing(false);
      });
  };

  const addColor = color => {
    axiosWithAuth().post(`/colors/`, colorToEdit);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            type="text"
            placeholder="color name"
            value={colorToEdit.color}
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
          />
        </label>
        <label>
          hex code:
          <input
            type="text"
            placeholder="hex code"
            value={colorToEdit.code.hex}
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
          />
        </label>
        <div className="button-row">
          <button type="submit">save new color</button>
          <button onClick={() => setEditing(false)}>cancel</button>
        </div>
      </form> */}
    </div>
  );
};

export default ColorList;
