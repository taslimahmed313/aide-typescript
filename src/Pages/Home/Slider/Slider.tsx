import logo from "../../../assets/images/aide-logo (1).png";
import "./Slider.css";

const Slider = () => {
  return (
    <div className="slide">
      <div className="load"></div>
      <div className="content">
        <div className="principle">
          <img src={logo} alt="" />
          <h1>aide</h1>
          <p>A WINDOW OF INFINITE POSSIBILITIES</p>
        </div>
      </div>
    </div>
  );
};

export default Slider;
