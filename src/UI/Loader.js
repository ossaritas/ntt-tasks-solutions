const Loader = (props) => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      {props.offerCount ? (
        <p>{`${props.offerCount} offers are loading, please wait.`}</p>
      ) : null}
    </div>
  );
};

export default Loader;
