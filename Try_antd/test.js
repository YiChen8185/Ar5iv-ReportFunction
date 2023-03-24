import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import html2canvas from 'html2canvas';

const ReportBox = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  const handleOk = () => {
    // Do something with the text value, such as sending it to the server
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const takeScreenshot = () => {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    html2canvas(document.body, {
      width: viewportWidth,
      height: viewportHeight,
      scrollX: -scrollX,
      scrollY: -scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight
    }).then((canvas) => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL();
      a.download = "screenshot.png";
      a.click();
    });
  };

  const openReportBox = () => {
    console.log('Report box opened!');
    setVisible(true);
  };

  return (
    <>
      <Button type="primary" onClick={openReportBox}>
        Report
      </Button>
      <Modal
        title="Report Box"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Input.TextArea
          placeholder="Enter your report here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="primary" onClick={takeScreenshot}>
          Take Screenshot
        </Button>
      </Modal>
    </>
  );
};

export default ReportBox;
