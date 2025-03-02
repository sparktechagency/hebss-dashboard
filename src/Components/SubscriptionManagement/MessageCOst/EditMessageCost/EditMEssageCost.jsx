/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Form, Input, InputNumber, message } from "antd";
import { useUpdateMessageCostMutation } from "../../../../redux/features/subscriptionApi/subscriptionApi";



const EditMEssageCost = ({ handleCancelEdit, messageCostId }) => {
    const [updateMessageCost] = useUpdateMessageCostMutation()
    const onFinish = async (values) => {
        try {
            const data = {
                costPerMessage: {
                    currency: values.costPerMessage.currency,
                    amount: values.costPerMessage.amount
                },
                maxCharacters: values.maxWords
            }
            if (messageCostId) {
                const res = await updateMessageCost({ _id: messageCostId, data })
                console.log(res);
                message.success("Message cost updated successfully");
                handleCancelEdit();
            }
        } catch (error) {
            message.error(error)
        }
    }


    return (
        <div>
            <div className="pt-8">
                <Form
                    name="add-category"
                    initialValues={{ remember: false, }}
                    onFinish={onFinish}
                    layout="vertical"
                >

                    <div className="">
                        <Form.Item label={<p className="text-md">Cost Per Message</p>}>
                            <div className="flex justify-between items-center gap-2">
                                <Form.Item
                                    name={['costPerMessage', 'amount']}
                                    rules={[{ required: true, message: "Please input a valid price amount!" }]}
                                    noStyle
                                >
                                    <InputNumber placeholder="Add price" style={{ width: "100%" }} />
                                </Form.Item>
                                <Form.Item
                                    name={['costPerMessage', 'currency']}
                                    rules={[{ required: true, message: "Please input currency!" }]}
                                    noStyle
                                >
                                    <Input placeholder="Add currency" />
                                </Form.Item>
                            </div>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="maxWords"
                        label={<p className="text-md">Set Maximum message character</p>}
                        rules={[
                            { required: true, message: "Please input a message cost!" },
                            { type: "number", min: 1, message: "Value must be greater than 0!" }
                        ]}
                    >
                        <InputNumber
                            placeholder="Add Maximum message character"
                            style={{ width: "100%" }}
                            min={1}
                        />
                    </Form.Item>


                    <Form.Item>
                        <button
                            onClick={handleCancelEdit}
                            type="submit"
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>



    );
};

export default EditMEssageCost;









