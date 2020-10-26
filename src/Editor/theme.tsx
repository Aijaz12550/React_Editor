const Theme: {
  [key: string]: {
    "background": string;
    "background-focus": string;
    "background-hover": string;
    "border-color":string;
  };
} = {
  default: {
    "background": "rgb(78, 76, 76)",
    "background-focus": "rgb(44, 44, 43)",
    "background-hover":"#521e4145",
    "border-color":"gray"
  },
  light: {
    "background": "#e6e6e6",
    "background-focus": "white",
    "background-hover":"white",
    "border-color": "lightgray" 
  },
  green: {
    "background": "#8ff10f3b",
    "background-focus": "#9def6a",
    "background-hover":"white",
    "border-color": "#2c732c" 
},
};

export default Theme;
