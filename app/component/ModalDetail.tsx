'use client'

import {Button, Card, Form, Input, Modal, Table} from "antd";

const ModalDetail = (props: any) => {
    const {
        form,
        title,
        formFields = [],
        formData,
        withTable = false,
        tableData,
        tableColumn,
        isOpen,
        handleCancelModal
    } = props

    console.log(formData)

    return (
        <Modal title={title} open={isOpen} centered bodyStyle={{
            height: 500,
            overflowX: 'scroll'
        }}
        footer={[
            <Button type={'primary'} onClick={() => {
                handleCancelModal()
            }}>Close</Button>
        ]}
        >
            <Card>
                <Form form={form} layout={'vertical'}>
                    {formFields.map((field: any) => (
                        <Form.Item name={field.name} label={field.label}>
                            <Input/>
                        </Form.Item>
                    ))}
                    {withTable && <Form.Item>
                        <Table dataSource={tableData} columns={tableColumn} pagination={false}></Table>
                    </Form.Item>}
                </Form>
            </Card>
        </Modal>
    )
}

export default ModalDetail;
