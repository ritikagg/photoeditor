import React, { useState, useEffect } from "react";
import { Image } from "./components/Image";
import "antd/dist/antd.css";
import axios from "axios";
import { Switch } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 90rem;
  margin: 8rem auto;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function App() {
  const [data, setData] = useState({ images: [], page: 1, isGrayScale: false });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    const apiRoot = "https://picsum.photos/v2/list";

    axios.get(`${apiRoot}?page=${data.page}&limit=15`).then((res) => {
      let state = { ...data };
      state.images = [...state.images, ...res.data];
      state.page = state.page + 1;

      setData(state);
    });
  };

  const greyscaleHandler = () => {
    let state = { ...data };
    state.isGrayScale = !state.isGrayScale;
    setData(state);
  };

  return (
    <div>
      <GlobalStyle />
      <Switch
        checkedChildren="colored"
        unCheckedChildren="Greyscale"
        defaultChecked
        onChange={greyscaleHandler}
      />
      {data.images.length > 0 && (
        <InfiniteScroll
          dataLength={data.images.length}
          next={fetchImages}
          hasMore={true}
          loader={<p style={{ textAlign: "center" }}>Loading...</p>}
        >
          <WrapperImages>
            {data.images.map((image) => (
              <Image
                url={image.download_url}
                key={image.key}
                author={image.author}
                isGrayScale={data.isGrayScale}
                width={image.width}
                height={image.height}
                id={image.id}
              />
            ))}
          </WrapperImages>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default App;
