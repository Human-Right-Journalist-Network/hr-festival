export const Partners = (props) => {
  return (
    // const baseUrl = "https://aif-festival.herokuapp.com"
    <div id="partners" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Support Us</h2>
          <p>
            You can support the festival in any way deem fit. Your support would
            be greatly appreciated and well documentation on how your supports
            are utilized and reports would be available on demand.
            <b> Please get in touch with us via admin@aihrff.hrjnet.org to support</b>
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i
                    className={d.icon}
                    style={{ color: "blue", fontSize: "40px" }}
                  ></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};

export default Partners;
