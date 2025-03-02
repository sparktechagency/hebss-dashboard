/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreateTermsAndConditionsMutation, useGetTermsAndConditionsQuery } from '../../../redux/features/SettingsApi/settingsApi';
import { message } from 'antd';

const TermsCondition = () => {
    const [value, setValue] = useState('');
    const [createTermsAndConditions] = useCreateTermsAndConditionsMutation();
    const { data: TermsData, refetch } = useGetTermsAndConditionsQuery();
    useEffect(() => {
        if (TermsData?.data?.termsCondition) {
            setValue(TermsData?.data?.termsCondition)
        }
    }, [TermsData?.data?.termsCondition, refetch])

    const handleSubmit = async (value) => {
        const data = {
            termsCondition: value,
        }
        try {
            const res = createTermsAndConditions(data).unwrap()
            console.log(res);
            message.success("Terms And Conditions updates Successfully")

        } catch (error) {
            console.log(error);
            message.error("faield to update Terms and conditions")
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

export default TermsCondition;