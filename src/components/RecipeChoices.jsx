import { useState } from "react";

const RecipeChoices = ({ handleChange, label, choices, checked }) => {
    
    return (
      <div>
        <ul className="radio-buttons">
          {choices &&
            choices.map((choice) => (
              <li key={choice}>
                <label>
                  <input
                    id={choice}
                    value={choice}
                    name={label}
                    type="radio"
                    onChange={handleChange}
                    checked={checked == choice}
                  />
                  {choice}
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
};

export default RecipeChoices