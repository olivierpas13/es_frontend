import { capitalize } from "lodash";

const Sidebar = ({ sidebarOptions, current }) => {
  return (
    <ul className=" menu border-r-2 h-screen w-56 m-0 p-0 rounded-none col-span-1">
      {sidebarOptions.map((option) => (
        <li
          key={option.name}
          className={`${
            current == option.name
              ? "bg-gray-200 font-extrabold"
              : "bg-white text-gray-700"
          } text-lg cursor-pointer`}
        >
          <h3 className="text-inherit" onClick={option.onClick}>
            {capitalize(option.name)}
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
