import React, { useState, useMemo } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";

const TABS = [
    { title: "Board View", icon: <MdGridView /> },
    { title: "List View", icon: <FaList /> },
];

const Tasks = () => {
    const params = useParams();
    const [selectedView, setSelectedView] = useState(0);
    const [open, setOpen] = useState(false);

    const status = params?.status || "";

    // Fetch Tasks
    const { data, isLoading, error } = useGetAllTaskQuery({
        strQuery: status,
        isTrashed: "",
        search: "",
    });

    // Debugging
    console.log("API Request Params:", { strQuery: status, isTrashed: false, search: "" });
    console.log("Fetched Data:", data);
    console.log("Error:", error);

    // Task Status Styles
    const TASK_TYPE = useMemo(
        () => ({
            todo: "bg-blue-600",
            "in progress": "bg-yellow-600",
            completed: "bg-green-600",
        }),
        []
    );

    // Handle Loading State
    if (isLoading) {
        return (
            <div className="py-10">
                <Loading />
            </div>
        );
    }

    // Handle Error State
    if (error) {
        console.error("Error fetching tasks:", error);
        return (
            <div className="py-10 text-red-600 text-center">
                Error loading tasks: {error?.message || "Something went wrong"}
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <Title title={status ? `${status} Tasks` : "Tasks"} />
                {!status && (
                    <Button
                        onClick={() => setOpen(true)}
                        label="Create Task"
                        icon={<IoMdAdd className="text-lg" />}
                        className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                        aria-label="Create a new task"
                    />
                )}
            </div>

            {/* Tabs & Task Status Headers */}
            <Tabs tabs={TABS} setSelected={setSelectedView}>
                {!status && <TaskStatusHeader TASK_TYPE={TASK_TYPE} />}

                {/* View Mode: Board or Table */}
                {data?.tasks?.length > 0 ? (
                    selectedView !== 1 ? <BoardView tasks={data?.tasks} /> : <Table tasks={data?.tasks} />
                ) : (
                    <div className="text-center text-gray-600 py-10">No tasks available.</div>
                )}
            </Tabs>

            {/* Add Task Modal */}
            <AddTask open={open} setOpen={setOpen} />
        </div>
    );
};

/** Component to display task status headers */
const TaskStatusHeader = ({ TASK_TYPE }) => (
    <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
        {Object.entries(TASK_TYPE).map(([label, className]) => (
            <TaskTitle key={label} label={label.charAt(0).toUpperCase() + label.slice(1)} className={className} />
        ))}
    </div>
);

export default Tasks;
