import { Link } from "react-router-dom";

const ContinuePage = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-between w-full gap-20 mx-auto md:max-w-screen-md md:flex-row ">
                    <div className="w-full md:w-[50%] order-2 md:order-1">
                        <div className=" md:h-[100vh] w-full flex flex-col items-center justify-center ">
                            <h1 className="mb-6 text-xl font-bold md:text-3xl">Congratulations</h1>
                            <Link to="/">
                                <button
                                    className="w-full p-2 px-16 py-2 font-semibold text-center text-white shadow-lg bg-primary rounded-2xl"
                                    type="submit"
                                >
                                    Continue
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-[50%] px-3 text-center order-1 md:order-2 mt-40 md:mt-0">
                        <p className="flex items-center justify-center text-lg text-neutral-500 ">Your password has been updated, please change your password regularly to avoid this happening</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContinuePage;