import { useContext } from "react";
import { ATTRIBUTE_LIST } from "../consts.js";
import AppContext from "../context/AppContext.jsx";

const AttributeSection = () => {
  const { attributes, handleAttributeDecrement, handleAttributeIncrement } =
    useContext(AppContext);
  return (
    <div className="attributes-section">
      <h2>Attributes</h2>

      <div>
        {ATTRIBUTE_LIST.map((attribute) => {
          return (
            <div
              key={attribute}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>
                {attribute}: {attributes[attribute.toLowerCase()].value}
                (Modifier: {attributes[attribute.toLowerCase()].modifier})
              </p>
              <button
                style={{ marginLeft: 10 }}
                onClick={() =>
                  handleAttributeIncrement(attribute.toLowerCase())
                }
              >
                +
              </button>
              <button
                style={{ marginLeft: 10 }}
                onClick={() =>
                  handleAttributeDecrement(attribute.toLowerCase())
                }
              >
                -
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttributeSection;
