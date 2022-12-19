const Warning = ({ children, title }) => {
  return (
    <section className="Warning">
      <h2>Warning!!! {title}</h2>
      <div>{children}</div>
    </section>
  );
};

export default Warning;
