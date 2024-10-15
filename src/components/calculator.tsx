import React, { useState } from "react";
import { NumberInput } from "./numberInput";

enum Period {
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export const CostPerUseCalculator: React.FC = () => {
  const [cost, setCost] = useState<number | string>(0);
  const [years, setYears] = useState<number | string>(1);
  const [frequency, setFrequency] = useState<number | string>(1);
  const [period, setPeriod] = useState<Period>(Period.YEAR); // Default is 'year'

  const calculateCostPerUse = (): string => {
    if (!cost || !years || !frequency) {
      return "0.00";
    }

    const costNum = typeof cost === "string" ? parseFloat(cost) : cost;
    const yearsNum = typeof years === "string" ? parseFloat(years) : years;
    const frequencyNum =
      typeof frequency === "string" ? parseFloat(frequency) : frequency;

    if (isNaN(costNum) || isNaN(yearsNum) || isNaN(frequencyNum)) {
      return "0.00";
    }

    const usesPerYear: Record<Period, number> = {
      [Period.WEEK]: frequencyNum * 52,
      [Period.MONTH]: frequencyNum * 12,
      [Period.YEAR]: frequencyNum,
    };

    const totalUses = usesPerYear[period] * yearsNum;
    const costPerUse = costNum / totalUses;

    return costPerUse.toFixed(2);
  };

  return (
    <div className="max-w-xl w-full mx-4 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 lg:text-3xl">
        Is it worth it?
      </h2>

      {/* Form container */}
      <div className="text-lg lg:text-xl">
        <p className="mb-4">
          I'm looking to buy something that costs
          <NumberInput
            id="costInput"
            defaultVal={cost as number}
            label="Cost"
            eventHandler={setCost}
          />
        </p>
        <p className="mb-4">
          It should last
          <NumberInput
            id="years"
            defaultVal={years as number}
            label="Years of Ownership"
            eventHandler={setYears}
          />
        </p>
        <p className="mb-4">
          And I plan to use it
          <NumberInput
            id="frequencyInput"
            defaultVal={frequency as number}
            label="Frequency of use"
            eventHandler={setFrequency}
          />{" "}
          per
          <label className="sr-only" htmlFor="periodInput">
            Period
          </label>
          <select
            id="periodInput"
            value={period}
            onChange={(event) => setPeriod(event.target.value as Period)}
            className="mx-1 border-b-2 bg-inherit border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={Period.WEEK}>week</option>
            <option value={Period.MONTH}>month</option>
            <option value={Period.YEAR}>year</option>
          </select>
          .
        </p>
      </div>

      <div className="mt-4">
        <h3 className="mt-6 text-xl font-semibold text-gray-800">
          Is it worth
          <span className="text-indigo-600">
            {` \$${calculateCostPerUse()} `}
          </span>
          per use?
        </h3>
      </div>
    </div>
  );
};
