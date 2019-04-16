const capitalize = s => {
  if (typeof s === "string") {
    s = s.toLowerCase();
    let t = s.slice(0, 1);
    const r = s.substr(1, s.length);
    t = t.toUpperCase();
    const sum = t.concat(r);
    return sum;
  } else {
    return s;
  }
};

export default capitalize;
