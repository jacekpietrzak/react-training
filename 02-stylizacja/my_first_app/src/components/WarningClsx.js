import clsx from "clsx";
import "./Warning.css";

const Warning = ({ children, title, warningType }) => {
  return (
    <section
      className={clsx("warning", {
        info: warningType === "info",
        danger: warningType === "danger",
        success: warningType === "success",
      })}
    >
      <h2>Alert!!! {title}</h2>
      <div>{children}</div>
    </section>
  );
};

export default Warning;
