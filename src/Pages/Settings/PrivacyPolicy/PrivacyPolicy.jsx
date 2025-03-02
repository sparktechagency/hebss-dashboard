/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreatePrivacyPolicyMutation, useGetPrivacyPolicyQuery } from '../../../redux/features/SettingsApi/settingsApi';
import { message } from 'antd';

const PrivacyPolicy = () => {
    const [value, setValue] = useState('');
    const [createPrivacyPolicy] = useCreatePrivacyPolicyMutation();
    const { data: privacyData, refetch } = useGetPrivacyPolicyQuery();
    useEffect(() => {
        if (privacyData?.data?.privacyPolicy) {
            setValue(privacyData?.data?.privacyPolicy)
        }
    }, [privacyData?.data?.privacyPolicy, refetch])
    const handleSubmit = async (value) => {
        const data = {
            privacyPolicy: value
        }
        try {
            const res = await createPrivacyPolicy(data).unwrap();
            console.log(res);
            message.success("Privacy policy updated successfully");
        } catch (error) {
            console.log(error);
            message.error("Failed to update privacy policy");
        }
    };
    return (
        <div className="mx-2 mb-10">

            <div className="">

                {/* show about data */}

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

export default PrivacyPolicy;