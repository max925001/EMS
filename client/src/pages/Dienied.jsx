import React from 'react';
import { useNavigate } from 'react-router-dom';

function Denied() {
    const navigate = useNavigate(); // Use lowercase 'navigate'

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                403
            </h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Access Denied
            </div>
            <button className="mt-5">
                <span
                    onClick={() => navigate('/')} // Fix the function call here
                    className="relative block px-8 py-3 bg-[#1A2238] border border-current text-white"
                >
                    Go Back
                </span>
            </button>
        </main>
    );
}

export default Denied;
