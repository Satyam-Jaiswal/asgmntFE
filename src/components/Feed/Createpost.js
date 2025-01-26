import { Button, Drawer, Space, Select } from "antd";
import React, { useState } from "react";
import { Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { multipartPostData } from "../../api/api";

const CreatePost = (props) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  // const [reload, setReload] = useState(false);

  const showLargeDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const createPost = async () => {
    const formData = new FormData();
    formData.append("caption", form.getFieldValue("caption"));
    formData.append("photo", file);

    multipartPostData("api/feed", formData).then((result) => {
      if (result.success !== false) {
        onClose();
        form.resetFields();
        props.setLoading((prev) => !prev);
      }
    });
  };

  const onFinish = () => {
    createPost();
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={showLargeDrawer}>
          Create Post
        </Button>
      </Space>

      <Drawer
        title="Create a new Post"
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onFinish}>
              OK
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Caption" name="caption">
            <Input placeholder="Enter caption" />
          </Form.Item>
          <Form.Item label="Upload Image" name="image">
            <Upload
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select placeholder="Select status">
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="in-progress">In Progress</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default CreatePost;
