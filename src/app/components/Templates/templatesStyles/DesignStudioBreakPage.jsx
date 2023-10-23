const DesignStudioBreakPage = ({ paperSize }) => {
  const containerStyle = {
    position: 'absolute',
    top: `calc(${paperSize})`,
    left: '-5%',
    width: '110%',
    color: '#717172',
    fontSize: '0.7rem',
    fontFamily: '"Source Sans Pro", sans-serif',
    lineHeight: '20px',
    borderTop: '2px dashed #E5E5E5',
  };

  return (
    <div className="design-studio-break-page" style={containerStyle}>
      <div />
      Break
    </div>
  );
};

export default DesignStudioBreakPage;
