import React, {useEffect, useState} from "react";
import "./styles/FadeSection.css";

const FadeSection = (props) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div className={`fade-in-section ${isVisible ? "is-visible" : ""}`} ref={domRef}>
      {props.children}
    </div>
  );
};

export default FadeSection;
