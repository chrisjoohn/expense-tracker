const PublicContainer = ({ children }) => {
  return (
    <div className="public-container" style={{ height: "100vh" }}>
      {children}
    </div>
  );
};

export default PublicContainer;
