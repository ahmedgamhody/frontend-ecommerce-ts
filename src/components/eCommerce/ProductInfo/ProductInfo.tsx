import styles from "./styles.module.css";
type ProductInfoProps = {
  title: string;
  price: number;
  img: string;
  style?: React.CSSProperties;
  direction?: "row" | "column";
  children?: React.ReactNode;
  quantity?: number;
};
export default function ProductInfo({
  title,
  price,
  img,
  style,
  direction = "row",
  children,
  quantity,
}: ProductInfoProps) {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt={title} />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2 title={title}>{title}</h2>
        <h3>{price.toFixed(2)} EGP</h3>
        {quantity && <h3>Quantity: {quantity}</h3>}
        {quantity && <h3>Total Price: {(quantity * price).toFixed(2)} EGP</h3>}
        {children}
      </div>
    </div>
  );
}
