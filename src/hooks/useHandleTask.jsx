import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext";

const useHandleTasks = () => {
    const { tasks, setTasks, updateRanking, updateStatus } = useContext(PlayerContext);

    const handleTasks = ({ type, amount }) => {
        const updatedTasks = tasks.map(task => {
            if (task.condition.type === type) {
                return handleUpdateTask(task, amount);
            }
            return task;
        });

        setTasks(updatedTasks);
    };

    const handleUpdateTask = (task, amount) => {
        if (task.condition.status.current >= (task.condition.status.final - 1)) {
            updateRanking(task.rank)
            updateStatus("task")
        }

        return { 
            ...task,
            condition: { 
                ...task.condition, 
                status: { 
                    ...task.condition.status, 
                    current: task.condition.status.current + amount 
                } 
            } 
        };
    };

    return handleTasks;
};

export default useHandleTasks;