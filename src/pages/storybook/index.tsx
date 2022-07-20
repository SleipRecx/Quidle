import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import Button from "src/components/atoms/buttons/Button";
import Input from "src/components/atoms/inputs/Input";
import { Column } from "src/components/atoms/layout";
import * as animationData from "../../../public/static/animations/success.json";

const StorybookPage = () => {
  return (
    <Column center>
      <div
        style={{
          maxWidth: 500,
          width: "100%",
        }}
      >
        <h1 data-aos="fade-up">Components and examples</h1>
        <h2 data-aos="fade-up">AOS Animations</h2>
        <div data-aos="fade-up">Fade up</div>
        <div data-aos="fade-left">Fade left</div>
        <div data-aos="zoom-in">Zoom in</div>
        <h2 data-aos="fade-up">Button</h2>
        <Button
          style={{
            marginBottom: 10,
          }}
        >
          Click me
        </Button>
        <h2>Input</h2>
        <Input onChangeText={(e) => undefined} value="ok" />
        <h2>Copy to clipboard</h2>
        <CopyToClipboard
          text={"Example text"}
          onCopy={() => toast.success("Copied link to clipboard")}
        >
          <Button
            style={{
              marginBottom: 10,
              background: "green",
            }}
          >
            Copy &quot;Example text&quot;
          </Button>
        </CopyToClipboard>
        <h2>Toast</h2>
        <Button
          style={{
            marginBottom: 10,
            background: "green",
          }}
          onClick={() => toast.success("Toast")}
        >
          Show toast
        </Button>
        <h2>Lottie animations</h2>
        <div
          data-aos="fade-up"
          style={{
            maxHeight: 100,
            maxWidth: 100,
          }}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
            }}
            height={"100%"}
            width={"100%"}
          />
        </div>
        <h2>Modal</h2>
        <div
          style={{
            height: 100,
          }}
        ></div>
      </div>
    </Column>
  );
};

export default StorybookPage;
