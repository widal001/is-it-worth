import React, { useState } from "react";

enum Period {
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export const CostPerUseCalculator: React.FC = () => {
  const [cost, setCost] = useState<number | string>("");
  const [years, setYears] = useState<number | string>("");
  const [frequency, setFrequency] = useState<number | string>("");
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
    <div className="max-w-xl w-full mx- p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Cost Per Use Calculator
      </h2>

      {/* Form container */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cost ($)
            <input
              type="number"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Years of Ownership
            <input
              type="number"
              value={years}
              onChange={(event) => setYears(event.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Frequency of Use
            <input
              type="number"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Per
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value as Period)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={Period.WEEK}>Week</option>
              <option value={Period.MONTH}>Month</option>
              <option value={Period.YEAR}>Year</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Cost per Use:{" "}
          <span className="text-indigo-600">${calculateCostPerUse()}</span>
        </h3>
      </div>
    </div>
  );
};
