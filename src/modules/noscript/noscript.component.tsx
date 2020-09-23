import React from "react";

const noScriptStyle = `img.fadeInOnLoad {
  opacity: 1 !important;
}`;

export const NoScript = () => {
  return (
    <noscript>
      <style
        dangerouslySetInnerHTML={{
          __html: noScriptStyle
        }}
      />
    </noscript>
  );
};
