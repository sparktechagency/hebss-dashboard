/* eslint-disable react/prop-types */

import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const GoBackButton = ({ text }) => {
    const navigate = useNavigate();
    const habdleBack = () => {
        navigate(-1);
    }



    return (
        <div>
            <button onClick={habdleBack} className="text-xl md:text-2xl font-bold flex justify-start items-center gap-2 mx-2 md:mx-0 py-7">
                <FaArrowLeft />
                {text}
            </button>
        </div>
    )
}

export default GoBackButton;