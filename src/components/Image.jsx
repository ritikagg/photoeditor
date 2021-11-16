import React, { useState } from "react";
import { Modal } from "antd";
import Details from "./Details";
import styled from "styled-components";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Image = ({ url, key, author, isGrayScale, width, height, id }) => {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <div onClick={() => setVisible(true)}>
        <Img key={key} src={isGrayScale ? url + `?grayscale` : url} alt="" />
        <div style={{ textAlign: "center" }}>{author}</div>
      </div>
      <Modal
        title={author}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={null}
      >
        <Details
          onClose={onClose}
          url="https://picsum.photos/id/"
          isGrayScale={isGrayScale}
          width={width}
          height={height}
          id={id}
        />
      </Modal>
    </>
  );
};
