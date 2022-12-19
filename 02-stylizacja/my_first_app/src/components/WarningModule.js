import clsx from "clsx";
import css from "./Warning.module.css";

const WarningModule = ({ children, title, warningType, hasShadow = false }) => {
  console.log("css: ", css);
  return (
    <section
      className={clsx(css[warningType], {
        [css.shadow]: hasShadow,
      })}
    >
      <h2>Alert!!! {title}</h2>
      <div>{children}</div>
    </section>
  );
};

export default WarningModule;
