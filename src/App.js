import { useContext, useMemo, useState } from "react";
import "./App.css";
import { CLASS_LIST, SKILL_LIST } from "./consts.js";
import AttributeSection from "./components/AttributeSection.jsx";
import AppContext from "./context/AppContext.jsx";

const MINIMUM_CLASS_REQUIREMENTS = {
  barbarian: {
    strength: 14,
    charisma: 9,
    constitution: 9,
    dexterity: 9,
    intelligence: 9,
    wisdom: 9,
  },
  wizard: {
    strength: 9,
    charisma: 9,
    constitution: 9,
    dexterity: 9,
    intelligence: 14,
    wisdom: 9,
  },
  bard: {
    strength: 9,
    charisma: 9,
    constitution: 9,
    dexterity: 9,
    intelligence: 14,
    wisdom: 9,
  },
};

function App() {
  const { attributes, totalSkillsPoints, skills } = useContext(AppContext);

  const [showClassInfo, setShowClassInfo] = useState({
    value: false,
    type: undefined,
  });

  const isMinimumRequirementForClassReached = (attributeRequirements) => {
    const {
      strength,
      charisma,
      constitution,
      dexterity,
      intelligence,
      wisdom,
    } = attributes;

    return (
      strength.value >= attributeRequirements.strength &&
      charisma.value >= attributeRequirements.charisma &&
      constitution.value >= attributeRequirements.constitution &&
      dexterity.value >= attributeRequirements.dexterity &&
      intelligence.value >= attributeRequirements.intelligence &&
      wisdom.value >= attributeRequirements.wisdom
    );
  };

  const isMinimumRequirementForClassReachedMemo = useMemo(() => {
    const result = {};
    Object.entries(MINIMUM_CLASS_REQUIREMENTS).forEach(
      ([className, requirements]) => {
        result[className] = isMinimumRequirementForClassReached(requirements);
      }
    );
    return result;
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
                  <option key={skill.name} value={skill.name}>
                    {skill.name}
                  </option>
                ))}
              </select>

              <label>DC:</label>
              <input type="number" />
              <button style={{ marginLeft: 10 }}>Roll</button>
            </div>
          </div>

          <div className="list-container">
            <AttributeSection />
            <div className="classes-section">
              <h2>Classes</h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {Object.keys(CLASS_LIST).map((_class) => (
                  <p
                    style={{
                      cursor: "pointer",
                      color: isMinimumRequirementForClassReachedMemo[
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
              <p>Total skill points available: {totalSkillsPoints}</p>

              {SKILL_LIST.map((skill) => (
                <div key={skill.name}>
                  {skill.name}: {skills[skill.name.toLowerCase()].value}{" "}
                  (Modifier: {skill.attributeModifier}):{" "}
                  {attributes[skill.attributeModifier.toLowerCase()].modifier}
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
