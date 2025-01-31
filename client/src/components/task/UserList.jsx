import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import clsx from "clsx";
import { getInitials } from "../../utils";
import { MdCheck } from "react-icons/md";
import { useGetTeamListQuery } from "../../redux/slices/api/userApiSlice"; // API Hook

const UserList = ({ setTeam, team }) => {
  const { data, isLoading, isError } = useGetTeamListQuery(); // Fetch users from API
  const users = data || []; // Default to empty array if no data
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (users.length > 0) {
      if (!team || team.length < 1) {
        setSelectedUsers([]); // No pre-selected users
      } else {
        setSelectedUsers(users.filter((u) => team.includes(u._id)));
      }
    }
  }, [team, users]);

  const handleChange = (selected) => {
    setSelectedUsers(selected);
    setTeam(selected.map((u) => u._id));
  };

  return (
    <div>
      <p className="text-gray-700">Assign Task To:</p>

      {/* Show Loader While Fetching */}
      {isLoading && <p className="text-gray-500">Loading users...</p>}

      {/* Show Error Message If API Fails */}
      {isError && <p className="text-red-500">Failed to load users</p>}

      {/* User List Selector */}
      {!isLoading && !isError && (
        <Listbox value={selectedUsers} onChange={handleChange} multiple>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 border border-gray-300 sm:text-sm">
              <span className={`block truncate ${selectedUsers.length === 0 ? "text-gray-400" : "text-gray-900"}`}>
                {selectedUsers.length > 0
                  ? selectedUsers.map((user) => user.name).join(", ")
                  : "Select Users"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronExpand className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                        }`
                      }
                      value={user}
                    >
                      {({ selected }) => (
                        <>
                          <div
                            className={clsx(
                              "flex items-center gap-2 truncate",
                              selected ? "font-medium" : "font-normal"
                            )}
                          >
                            <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
                              <span className="text-center text-[10px]">
                                {getInitials(user.name)}
                              </span>
                            </div>
                            <span>{user.name}</span>
                          </div>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <MdCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))
                ) : (
                  <p className="text-center py-2 text-gray-500">No users available</p>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  );
};

export default UserList;
