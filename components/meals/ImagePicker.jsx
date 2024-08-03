"use client";
import Image from "next/image";
import classes from "./ImagePicker.module.css";
import React, { useRef, useState } from "react";

export default function ImagePicker({ label, name }) {
  const imageInput = useRef();
  const [pickedImage, setPickedImage] = useState();

  const pickClick = () => {
    imageInput.current.click();
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>
        <input
          ref={imageInput}
          className={classes.input}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={name}
          onChange={onImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={pickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
