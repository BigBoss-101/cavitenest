"use client"

import { interests } from "../constants/interests";
import { FaLocationArrow } from "react-icons/fa";
import useCaviteMunicipalities from "../hooks/useCountries";

interface ProfileCardProps {
    header?: string;
    email?: string
    contactNo?: string;
    interest?: string[] | string | undefined;
    location?: string;
    description?: string;
    favImg?: string;

    center?: boolean;
    border?: boolean;
    borderColor?: string;
    lineColor?: string;
    hoverColor?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    header,
    email,
    contactNo,
    interest,
    location,
    description,
    favImg,

    center, 
    border = false, 
    borderColor = "border-gray-300",
    lineColor = "border-gray-300",
    hoverColor = "bg-gray-300",
    }) => {
    const { getByValue } = useCaviteMunicipalities();
    const interestArray = Array.isArray(interest) ? interest : interest ? [interest] : [];

    const locationDetails = location ? getByValue(location) : null;
    const fullLocationLabel = locationDetails ? locationDetails.label : location; // Use the label if found, otherwise the original value
    return (
        <div>
            <div className="flex flex-row font-extrabold text-4xl mt-10 ml-4 mb-5">
                    About {header}
                {/* Display the full location name */}
                <h1 className="flex flex-row items-center gap-2 mt-2 justify-end mx-auto mr-7 text-base font-semibold text-gray-700" title={fullLocationLabel}>
                    <FaLocationArrow/>{fullLocationLabel}
                </h1>
            </div>
            <div className="flex flex-col gap-12">
            <div className="bg-white shadow-2xl rounded-3xl p-7 w-full pr-20 border-2 border-gray-100">
                <div className="flex flex-row font-bold text-3xl mb-6">
                    Contacts
                </div>
                <div className="ml-3">
                    <div className="flex flex-row items-center gap-2 text-xl">  
                        <h1 className="font-medium">
                                Email Address:
                        </h1>
                        <span className="bg-gray-300 px-5 -py-1 text-lg rounded-3xl">
                            {email}
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-2 text-xl mt-4">
                    <h1 className="font-medium">
                            Contact Number:
                        </h1>
                        <span className="bg-gray-300 px-5 -py-1 text-lg rounded-3xl">
                            {contactNo}
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-2xl rounded-2xl p-7 w-full pr-20 border-gray-100">
                <div className="flex flex-row font-bold text-3xl mb-5">
                    Intro.
                    <hr></hr>
                </div>
                <div className="ml-4 font-medium">
                    {description}
                </div>
            </div>
            <div className="bg-white shadow-2xl rounded-2xl p-7 w-full pr-20 border-gray-100">
                <div className="flex flex-row font-bold text-3xl mb-5">
                    Interests
                    <hr></hr>
                </div>
                <div className="ml-3">
            <div className="grid grid-cols-2 gap-4"> {/* Grid layout for 2 columns */}
            {interestArray.length > 0 ? (
                interestArray.map((interestLabel, index) => {
                const interestData = interests.find((i) => i.label === interestLabel);

                return interestData ? (
                    <div
                    key={index}
                    className="flex items-center justify-center gap-2 ml-4 text-xl font-normal py-2 -px-6 border-2 border-black rounded-3xl p-3 bg-gray-300"
                    >
                    <interestData.icon /> {/* Render the icon */}
                    <span>{interestData.label}</span> {/* Render the label */}
                    </div>
                ) : null;
                })
            ) : (
                <p>No interests added.</p>
            )}                   
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};


export default ProfileCard