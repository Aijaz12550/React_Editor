import React from "react";
import Theme from "./theme";

export default (themeName: "default" | "light" | "dark" | "green" | string = "default") => {
  const currentTheme = Theme[themeName];
  let variables = "";

  Object.entries(currentTheme).map(([key, val]) => {
    console.log("|||||1",key, val);
    variables += `--${key}:${val};`;
  });
  console.log("|||||",variables);

  const css = `:root{${variables}}`;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");

  head.appendChild(style);

  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
};
