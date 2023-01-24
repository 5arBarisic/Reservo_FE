import React from "react";


const ShowCase = () => {
    return (
        <ul className="mb-5 list-none flex justify-center text-white text-md gap-x-6 bg-gray-900 p-3 rounded-xl">
            <li>
                <span className="inline-block bg-gray-600 w-8 h-6 rounded-t-md relative top-1"/>
                <p>Available</p>
            </li>
            <li>
                <span className="inline-block bg-green-500 w-8 h-6 rounded-t-md  duration-300 relative top-1"/>
                <p>Selected</p>
            </li>
            <li>
                <span className="inline-block bg-gray-200 w-8 h-6 rounded-t-md duration-300 relative top-1"/>
                <p>Occupied</p>
            </li>
        </ul>
    )
}
export default ShowCase;