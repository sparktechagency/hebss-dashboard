/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TermsCondition = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (value) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            message.success("Terms And Conditions updates Successfully");
            setLoading(false);
        }, 1000);
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
                    className="px-10 py-3 mt-20 md:my-16 rounded bg-primary text-white font-semiboldbold shadow-lg flex justify-center items-center"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default TermsCondition;