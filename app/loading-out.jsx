import classes from "./loading.module.css";
import React from "react";

export default function MealsLoding() {
  return <p className={classes.loading}>Fetching meals ...</p>;
}
