import "./Warning.css";

const Warning = ({ children, title, warningType }) => {
  const classes = ["warning"];
  if (warningType === "info") {
    classes.push("info");
  } else if (warningType === "danger") {
    classes.push("danger");
  } else if (warningType === "success") {
    classes.push("success");
  }

  return (
    <section className={classes.join(" ")}>
      <h2>Warning!!! {title}</h2>
      <div>{children}</div>
    </section>
  );
};

export default Warning;
