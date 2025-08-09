import { tabs } from "./Tabs";

import PropTypes from "prop-types";

const AdminTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="md:flex    max-h-screen  ">
      <ul className="flex-column bg-gray-900 md:w-2/8 md:p-5 p-4   md:h-[93.4vh]    space-y space-y-3 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4  md:mb-0">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <button
              onClick={() => setActiveTab(tab.name)}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                activeTab === tab.name
                  ? "text-white bg-blue-700 dark:bg-blue-600"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white "
              }     `}
            >
              {tab.icon}
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {tabs.find((tab) => tab.name === activeTab)?.content}
      </div>
    </div>
  );
};

AdminTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default AdminTabs;
