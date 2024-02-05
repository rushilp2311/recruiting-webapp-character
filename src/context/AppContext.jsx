import { useMemo, useState, createContext, useEffect } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts";

const BASE_ATTRIBUTE_VALUE = 10;

const TOTAL_ATTRIBUTE_VALUE = 70;

const AppContext = createContext({});

const getInitialSkills = () => {
  const initialSkills = {};

  SKILL_LIST.forEach((skill) => {
    initialSkills[skill.name.toLowerCase()] = {
      value: 0,
      modifier: skill.attributeModifier.toLowerCase(),
      total: 0,
    };
  });

  return initialSkills;
};

export function AppContextProvider({ children }) {
  const [attributes, setAttributes] = useState({
    strength: { value: 10, modifier: 0 },
    dexterity: { value: 10, modifier: 0 },
    constitution: { value: 10, modifier: 0 },
    intelligence: { value: 10, modifier: 0 },
    wisdom: { value: 10, modifier: 0 },
    charisma: { value: 10, modifier: 0 },
  });

  const getCurrentTotalOfAttributeValue = () => {
    return Object.values(attributes)
      .map(({ value }) => value)
      .reduce((prev, curr) => prev + curr, 0);
  };

  const handleAttributeIncrement = (attribute) => {
    const currentAttribute = attributes[attribute];

    const updatedValue = currentAttribute.value + 1;

    const currentTotal = getCurrentTotalOfAttributeValue();

    if (currentTotal + 1 > TOTAL_ATTRIBUTE_VALUE) {
      alert("Total Attributes value can only add up to 70");
      return;
    }

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

    if (updatedValue < 0) return;

    const updatedModifier =
      (updatedValue - BASE_ATTRIBUTE_VALUE) % 2 === 0
        ? currentAttribute.modifier - 1
        : currentAttribute.modifier;

    setAttributes((prev) => ({
      ...prev,
      [attribute]: { value: updatedValue, modifier: updatedModifier },
    }));
  };

  // Skills section

  const [totalSkillsPoints, setTotalSkillsPoints] = useState(0);

  const [skills, setSkills] = useState(getInitialSkills());

  useEffect(() => {
    setTotalSkillsPoints(10 + 4 * attributes.intelligence.modifier);
  }, [attributes.intelligence.modifier]);

  return (
    <AppContext.Provider
      value={{
        attributes,
        setAttributes,
        handleAttributeDecrement,
        handleAttributeIncrement,

        //   Skills Section

        skills,
        setSkills,

        totalSkillsPoints,
        setTotalSkillsPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
