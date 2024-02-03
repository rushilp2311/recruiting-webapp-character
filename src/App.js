import { useMemo, useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

const BASE_ATTRIBUTE_VALUE = 10;

function App() {
  const [attributes, setAttributes] = useState({
    strength: { value: 10, modifier: 0 },
    dexterity: { value: 10, modifier: 0 },
    constitution: { value: 10, modifier: 0 },
    intelligence: { value: 10, modifier: 0 },
    wisdom: { value: 10, modifier: 0 },
    charisma: { value: 10, modifier: 0 },
  });

  const [showClassInfo, setShowClassInfo] = useState({
    value: false,
    type: undefined,
  });

  const handleAttributeIncrement = (attribute) => {
    const currentAttribute = attributes[attribute];

    const updatedValue = currentAttribute.value + 1;

    const updatedModifier =
      (updatedValue - BASE_ATTRIBUTE_VALUE) % 2 === 0
        ? currentAttribute.modifier + 1
        : currentAttribute.modifier;

    setAttributes((prev) => ({
      ...prev,
      [attribute]: { value: updatedValue, modifier: updatedModifier },
    }));
  };

  const handleAttributeDecrement = (attribute) => {
    const currentAttribute = attributes[attribute];

    const updatedValue = currentAttribute.value - 1;

    const updatedModifier =
      (updatedValue - BASE_ATTRIBUTE_VALUE) % 2 === 0
        ? currentAttribute.modifier - 1
        : currentAttribute.modifier;

    setAttributes((prev) => ({
      ...prev,
      [attribute]: { value: updatedValue, modifier: updatedModifier },
    }));
  };

  const isMinimunRequirementForClassReached = useMemo(() => {
    const barbarianClassMinimumRequirement = true;
    const wizardClassMinimumRequirement = true;
    const bardClassMinimumRequirement = true;

    return {
      barbarian: barbarianClassMinimumRequirement,
      wizard: wizardClassMinimumRequirement,
      bard: bardClassMinimumRequirement,
    };
  }, [attributes]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="character">
          <div className="character-heading">
            <h2>Character: 1</h2>
          </div>
          <div className="skill-check">
            <h3>Skill Check</h3>
            <div>
              <label>Skill:</label>
              <select name="skills" id="skill">
                {SKILL_LIST.map((skill) => (
                  <option value={skill.name}>{skill.name}</option>
                ))}
              </select>

              <label>DC:</label>
              <input type="number" />
              <button style={{ marginLeft: 10 }}>Roll</button>
            </div>
          </div>

          {/* ------------- */}

          <div className="list-container">
            <div className="attributes-section">
              <h2>Attributes</h2>

              <div>
                {ATTRIBUTE_LIST.map((attribute) => {
                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p>
                        {attribute}: {attributes[attribute.toLowerCase()].value}
                        (Modifier:{" "}
                        {attributes[attribute.toLowerCase()].modifier})
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
            <div className="classes-section">
              <h2>Classes</h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {Object.keys(CLASS_LIST).map((_class) => (
                  <p
                    style={{
                      cursor: "pointer",
                      color: isMinimunRequirementForClassReached[
                        _class.toLowerCase()
                      ]
                        ? "red"
                        : "white",
                    }}
                    onClick={() =>
                      setShowClassInfo((prev) => ({
                        value: !prev.value,
                        type: _class,
                      }))
                    }
                  >
                    {_class}
                  </p>
                ))}
              </div>
            </div>
            {showClassInfo.value && (
              <div className="classes-section">
                <h3>{showClassInfo.type} Minimum Requirements</h3>

                {Object.keys(CLASS_LIST[showClassInfo.type]).map((_class) => {
                  return (
                    <p>
                      {_class} : {CLASS_LIST[showClassInfo.type][_class]}
                    </p>
                  );
                })}

                <button
                  onClick={() =>
                    setShowClassInfo({
                      value: false,
                      type: undefined,
                    })
                  }
                >
                  Close the requirements
                </button>
              </div>
            )}
            <div className="skills-section">
              <h2>Skills</h2>
              <p>
                Total skill points available: {attributes.intelligence.value}
              </p>

              {SKILL_LIST.map((skill) => (
                <div key={skill.name}>
                  {skill.name}: 0 (Modifier: {skill.attributeModifier}):0
                  <button>+</button>
                  <button>-</button>
                  total: 0
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
