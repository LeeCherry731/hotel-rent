import React from "react";
import TableTwoCom from "../../components/tableTwo.com";

type Props = {};

const MemberDashboard = (props: Props) => {
  return (
    <>
      <TableTwoCom />

      <fieldset className="bg-white mt-5 p-5 rounded-md">
        <legend className="sr-only">Countries</legend>

        <div className="flex items-center mb-4">
          <input
            id="country-option-1"
            type="radio"
            name="countries"
            value="USA"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked
          />
          <label
            htmlFor="country-option-1"
            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            United States
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            id="country-option-2"
            type="radio"
            name="countries"
            value="Germany"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="country-option-2"
            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Germany
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            id="country-option-3"
            type="radio"
            name="countries"
            value="Spain"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="country-option-3"
            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Spain
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            id="country-option-4"
            type="radio"
            name="countries"
            value="United Kingdom"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="country-option-4"
            className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            United Kingdom
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="option-disabled"
            type="radio"
            name="countries"
            value="China"
            className="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            disabled
          />
          <label
            htmlFor="option-disabled"
            className="block ml-2 text-sm font-medium text-gray-300 dark:text-gray-700"
          >
            China (disabled)
          </label>
        </div>
      </fieldset>
    </>
  );
};

export default MemberDashboard;
