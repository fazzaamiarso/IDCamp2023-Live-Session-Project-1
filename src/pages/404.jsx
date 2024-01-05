import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    return <div className="">
        <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-bold">Not Found</h2>
            <p className="mb-8">The page you're looking for is not available</p>
            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-white dark:bg-darkBg shadow-md">Go Back</button>
        </div>
    </div>
}

export default NotFound;