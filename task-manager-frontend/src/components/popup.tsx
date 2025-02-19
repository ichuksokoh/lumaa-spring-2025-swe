import { useState } from "react"


interface PopupProps {
    handleEditTask : (taskId: number, title: string, description: string) => Promise<void>; 
    taskId : number;
    close : (shouldClose: boolean) => void;
}


export default function Popup( { handleEditTask, taskId, close } : PopupProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <form className="absolute z-50 flex flex-col gap-4 justify-center items-center w-screen h-screen bg-gray-600 rounded-lg"
            onSubmit={() => {handleEditTask(taskId, title, description); close(false)}}>
            <input className="p-2 max-w-64 max-h-8 border-2 rounded-md" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input required className="p-2 max-w-64 max-h-8 border-2 rounded-md" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Submit</button>
            <button onClick={() => close(false)}>Cancel</button>
        </form>
    )
}