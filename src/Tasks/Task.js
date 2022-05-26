import questionMark from "../assets/questMark.svg";
const Task = (props) => {
  var formatter = new Intl.NumberFormat("tr-TR", {
    currency: "TRY",
    style: "currency",
    minimumFractionDigits: 2,
  });
  return (
    <div className="content-container">
      <div className="content-left">
        <div className="content-left-img">
          <img src={props.img} alt={props.firmName} />
        </div>
        <div className="divider"></div>
        <div className="content-left-text">
          <div>
            {props.type} {""}
            {props.description ? (
              <div className="popover-wrapper">
                <img
                  className="popover-title"
                  src={questionMark}
                  alt="popover"
                />

                <p className="popover-content">
                  {" "}
                  <span className="popover-message">{props.description}</span>
                  <br />
                  <span className="popover-message">{props.explanation}</span>
                </p>
              </div>
            ) : null}
          </div>
          <p>{props.firmName}</p>
        </div>
      </div>

      <div className="content-right">
        <div>
          <p
            className={`${props.discount ? "def-price-overline" : "def-price"}`}
          >
            {formatter.format(props.price)}
          </p>
          {props.discount ? (
            <p className={`${props.discount ? "def-price" : ""}`}>
              Peşin: {""}
              {formatter.format(props.dsPrice)}
            </p>
          ) : null}
        </div>
        <div className="content-right-action">
          {!props.saleActive ? (
            <button className="btn-first-option">Satın Al</button>
          ) : (
            <button className="btn-second-option">Telefondan Satın Al</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
