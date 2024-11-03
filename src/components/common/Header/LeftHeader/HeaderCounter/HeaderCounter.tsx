import styles from "./styles.module.css";
// import { BsCart2 } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type HeaderCounterProps = {
  totalQuantity: number | 0;
  navigate: string;
  icon: JSX.Element;
  title: string;
};

const { container, totalNum, pumpAnimate } = styles;

export default function HeaderCounter({
  totalQuantity,
  navigate,
  icon,
  title,
}: HeaderCounterProps) {
  const [isAnimate, setIsAnimate] = useState(false);
  const nav = useNavigate();
  const quantityStyle = `${totalNum} ${isAnimate && pumpAnimate}`;
  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);
  return (
    <div
      className="d-flex align-items-center gap-1"
      style={{ cursor: "pointer" }}
      onClick={() => {
        nav(navigate);
      }}
    >
      <div className={container}>
        {icon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h5 className="mb-0">{title}</h5>
    </div>
  );
}
