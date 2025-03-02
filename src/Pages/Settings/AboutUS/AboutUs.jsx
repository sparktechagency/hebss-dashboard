/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreateAndUpdateAboutUsMutation, useGetAboutUsQuery } from '../../../redux/features/SettingsApi/settingsApi';
import { message } from 'antd';

const AboutUs = () => {
    const [value, setValue] = useState('');
    const [createAndUpdateAboutUs] = useCreateAndUpdateAboutUsMutation();
    const { data: AboutData, refetch } = useGetAboutUsQuery();
    // console.log(AboutData?.data?.description)
    useEffect(() => {
        if (AboutData?.data?.description) {
            setValue(AboutData?.data?.description)
        }
    }, [AboutData?.data?.description, refetch])

    const handleSubmit = async (value) => {
        console.log(value);
        const data = {
            description: value
        }
        try {
            const response = await createAndUpdateAboutUs(data).unwrap();
            console.log(response);
            message.success("About us updated successfully");

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="mx-2 mb-10">

            <div className="">
                <ReactQuill
                    style={{ height: 600 }}
                    theme="snow"
                    value={value}

                    onChange={setValue} />


                <button
                    onClick={() => handleSubmit(value)}
                    className="px-10 py-3 mt-20  md:my-16 rounded bg-primary text-white font-semiboldbold shadow-lg flex justify-center items-center"
                    type="submit"
                >
                    Save
                </button>

            </div>

        </div>
    );
};

export default AboutUs;