export const avatarName = (str) => {
  let words = str.split(" ");
  let nametitle = "";
  if (words.length >= 2) {
    let firstletter = words[0][0];
    let secandletter = words[1][0];
    nametitle = firstletter + secandletter;
  } else {
    let firstletter = words[0][0];
    nametitle = firstletter;
  }
  return nametitle.toUpperCase();
};

export const extractFirstName = (str) => {
  const words = str.split(" ");

  if (words.length >= 1) {
    return words[0];
  } else {
    return str; // If there's only one word or an empty string, return the input as is.
  }
};