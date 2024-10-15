import React from "react";

interface NumberInputProps {
  id: string; // Unique ID for the input
  label: string; // Label for the input
  defaultVal: number; // Default value for the input
  eventHandler: (value: string) => void; // Function to handle change events
}

export const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  defaultVal,
  eventHandler,
}) => {
  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={defaultVal}
        onChange={(event) => eventHandler(event.target.value)} // Call the event handler with the input value
        className="w-16 mx-1 border-b-2 border-gray-300 bg-inherit text-center focus:ring-indigo-500 focus:border-indigo-500"
        aria-describedby={`${id}Description`} // Use the id to link to description
      />
      <span id={`${id}Description`}>
        {label === "Cost"
          ? "dollars. "
          : label === "Years of Ownership"
            ? " years. "
            : " times"}
      </span>
    </>
  );
};
