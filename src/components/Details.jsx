import React, { useState, useRef, useEffect } from "react";
import { Form, Switch, Slider, Button } from "antd";
import { saveAs } from "file-saver";
import styled from "styled-components";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Details({ url, isGrayScale, id, height, width }) {
  const [imageConfig, setImageConfig] = useState({
    isGray: isGrayScale,
    blur: 0,
    width: width,
    height: height,
  });

  const heightRef = useRef();
  const widthRef = useRef();

  const greyscaleHandler = () => {
    let state = { ...imageConfig };
    state.isGray = !state.isGray;
    setImageConfig(state);
  };

  const sliderHandler = (value) => {
    let state = { ...imageConfig };
    state.blur = value;
    setImageConfig(state);
  };

  useEffect(() => {
    srcCreator();
  }, [imageConfig]);

  const srcCreator = () => {
    let image_src = url + `${id}/${imageConfig.width}/${imageConfig.height}`;
    if (imageConfig.isGray && imageConfig.blur > 0) {
      image_src = image_src + `?grayscale&blur=${imageConfig.blur}`;
    } else if (!imageConfig.isGray && imageConfig.blur > 0) {
      image_src = image_src + `?blur=${imageConfig.blur}`;
    } else if (imageConfig.isGray && imageConfig.blur === 0) {
      image_src = image_src + `?grayscale`;
    }

    return image_src;
  };

  const heightChange = () => {
    let state = { ...imageConfig };
    state.height = heightRef.current.value;
    setImageConfig(state);
  };

  const widthChange = () => {
    let state = { ...imageConfig };
    state.width = widthRef.current.value;
    setImageConfig(state);
  };

  const downloadImageHandler = () => {
    const preview = document.getElementsByClassName("preview");
    console.log(preview[0].src);
    saveAs(preview[0].src, "image.jpg");
  };

  const content = (
    <>
      <Img className="preview" src={srcCreator()} alt="" />
      <Form name="basic">
        <div className="image-config">
          <Form.Item>
            <Switch
              checkedChildren="colored"
              unCheckedChildren="Greyscale"
              defaultChecked
              onChange={greyscaleHandler}
            />
          </Form.Item>
          <Form.Item label="Blur" className="image-config__slider">
            <div className="slider">
              <Slider
                defaultValue={0}
                min={0}
                max={10}
                onChange={sliderHandler}
                value={imageConfig.blur}
              />
            </div>
          </Form.Item>
        </div>
        <div className="image-config image-config__size">
          <Form.Item label="Height">
            <input
              type="number"
              value={imageConfig.height}
              onChange={heightChange}
              ref={heightRef}
            />
          </Form.Item>
          <Form.Item label="Width">
            <input
              type="number"
              value={imageConfig.width}
              onChange={widthChange}
              ref={widthRef}
            />
          </Form.Item>
        </div>
        <Button onClick={downloadImageHandler}>Download Image</Button>
      </Form>
    </>
  );

  return <>{content}</>;
}

export default Details;
