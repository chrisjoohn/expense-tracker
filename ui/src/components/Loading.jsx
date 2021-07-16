const Loading = (props) => {
  return (
    <div style={{ position: "absolute", left: "50%", top: "40%" }}>
      <img
        src="/images/green-loading.gif"
        style={{
          width: "100px",
          position: "relative",
          left: "-50%",
          top: "-50%",
        }}
      />
    </div>
  );
};

export default Loading;
