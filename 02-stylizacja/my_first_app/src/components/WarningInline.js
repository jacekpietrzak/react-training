const danger = {
  backgroundColor: "red",
  color: "#fff",
};
const info = {
  backgroundColor: "blue",
  color: "#fff",
};
const success = {
  backgroundColor: "green",
  color: "#fff",
};
const warning = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "15px",
  padding: "10px",
  margin: "10px",
  borderRadius: "5px",
  backgroundColor: "#999",
};

const setWarningStyles = (type) => {
  switch (type) {
    case "danger":
      return danger;
    case "success":
      return success;
    case "info":
      return info;
    default:
      return warning;
  }
};

const WarningInline = ({ children, title, warningType }) => {
  console.log("warningType: ", warningType, setWarningStyles(warningType));

  return (
    <section style={{ ...warning, ...setWarningStyles(warningType) }}>
      <h2>Warning Inline!!! {title}</h2>
      <div>{children}</div>
    </section>
  );
};

export default WarningInline;
