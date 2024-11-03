import { memo } from "react";

function Heading({ title }: { title: string }) {
  return (
    <h2 className="mb-4" style={{ fontSize: "28px" }}>
      {title}
    </h2>
  );
}

export default memo(Heading);
