import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState, useCallback } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  useGetNotificationQuery,
  useMarkNotificationReadMutation,
} from "../redux/slices/api/userApiSlice";
import ViewNotification from "./ViewNotification";

const ICONS = {
  alert: (
    <HiBellAlert className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
  ),
  message: (
    <BiSolidMessageRounded className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
  ),
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const {
    data: notifications,
    error,
    isLoading,
    refetch,
  } = useGetNotificationQuery();
  const [markAsRead] = useMarkNotificationReadMutation();
  const [loading, setLoading] = useState(false);

  console.log("Notifications Data:", notifications); // Debugging API Response

  // Mark notification as read (single or all)
  const readHandler = useCallback(
    async (type, id) => {
      try {
        await markAsRead({ type, id }).unwrap();
        refetch(); // Refetch notifications after marking as read
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
        alert(
          "There was an issue marking the notification as read. Please try again."
        );
      }
    },
    [markAsRead, refetch]
  );

  // Handle view notification
  const viewHandler = useCallback(
    (el) => {
      setSelected(el);
      readHandler("one", el._id); // Mark selected notification as read
      setOpen(true);
    },
    [readHandler]
  );

  // Mark all notifications as read
  const markAllReadHandler = async () => {
    setLoading(true);
    await readHandler("all", "");
    setLoading(false);
  };

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: loading ? "Marking..." : "Mark All Read",
      href: "#",
      icon: "",
      onClick: markAllReadHandler,
    },
  ];

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="inline-flex items-center outline-none">
          <div className="w-8 h-8 flex items-center justify-center text-gray-800 relative">
            <IoIosNotificationsOutline className="text-2xl" />
            {notifications?.length > 0 && (
              <span className="absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600">
                {notifications?.length}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max px-4">
            {({ close }) => (
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {isLoading && (
                    <p className="text-center text-gray-500">
                      Loading notifications...
                    </p>
                  )}
                  {error && (
                    <p className="text-center text-red-500">
                      Failed to load notifications.
                    </p>
                  )}

                  {notifications?.length > 0 ? (
                    notifications.slice(0, 5).map((item, index) => (
                      <div
                        key={item._id + index}
                        className="group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white">
                          {ICONS[item.notiType]}
                        </div>

                        <div
                          className="cursor-pointer"
                          onClick={() => viewHandler(item)}
                        >
                          <div className="flex items-center gap-3 font-semibold text-gray-900 capitalize">
                            <p>{item.notiType}</p>
                            <span className="text-xs font-normal lowercase">
                              {moment(item.createdAt).fromNow()}
                            </span>
                          </div>
                          <p className="line-clamp-1 mt-1 text-gray-600">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No new notifications
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 divide-x bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      onClick={
                        item?.onClick ? () => item.onClick() : () => close()
                      }
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
      <ViewNotification open={open} setOpen={setOpen} el={selected} />
    </>
  );
};

export default NotificationPanel;
