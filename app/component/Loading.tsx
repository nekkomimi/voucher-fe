import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Spin size="large" />
        <div style={{ marginTop: "10px" }}>Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
