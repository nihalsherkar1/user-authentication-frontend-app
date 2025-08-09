import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from "yup";
import { fetchRoles } from "../../service/roleService";
import { addUser } from "../../service/userService";
export const AddUser = () => {
  const [roles, setRoles] = useState([]);

  const token = sessionStorage.getItem("token");
  const [isRolesLoaded, setIsRolesLoaded] = useState(false);

  const handleDropDownFocus = async () => {
    if (!isRolesLoaded) {
      try {
        const data = await fetchRoles();
        console.log("Roles:", data);
        setRoles(data);
        setIsRolesLoaded(true);
      } catch (error) {
        console.error("Failed to load roles:", error);
      }
    }
  };

  const userSchema = Yup.object({
    username: Yup.string()
      .min(3, "username must be at least 3 character")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 character")
      .required("Password is required"),
    role: Yup.string().required("role is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await addUser(values, token);
        console.log("User added:", data);
      } catch (error) {
        console.error("Error adding user:", error);
      }

      resetForm();
    },
  });
  return (
    <div className="  flex items-center justify-center   mt-4     ">
      <div className="w-full  max-w-md bg-white p-9 rounded-lg shadow-md">
        <form action="#" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block font-medium text-gray-700   "
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-5
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             block w-full p-2.5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.errors.username && (
              <div className="text-red-500">{formik.errors.username}</div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <div>
            <label
              className="block font-medium text-gray-700 "
              htmlFor="selectRole"
            >
              Select Role
            </label>
            <select
              name="role"
              id="role"
              onFocus={handleDropDownFocus} // fetch roles only on first focus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Select Role">Select Role</option>
              {roles.map((role) => (
                <option value={role.name} key={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {formik.errors.role && (
              <div className="text-red-500">{formik.errors.role}</div>
            )}
          </div>

          <button type="submit" className="bg-blue-500 mx-2 p-3 text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
