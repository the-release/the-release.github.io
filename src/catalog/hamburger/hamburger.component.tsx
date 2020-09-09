import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s;
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  height: -webkit-fill-available;
  background: #fff;
  transition: transform 0.5s;
`;

const Input = styled.input`
  display: none;

  &:not(:checked) ~ ${Menu} {
    transform: translateY(-100%);
  }

  &:checked ~ ${Overlay} {
    opacity: 1;
  }
`;

const Label = styled.label`
  display: block;
  cursor: pointer;
`;

export const Hamburger = () => {
  return (
    <>
      <Input id="hamburger" type="checkbox" />
      <Label htmlFor="hamburger">Open Menu</Label>
      <Overlay />
      <Menu>
        <ul>
          <li>This is a menu</li>
          <li>This is a menu</li>
          <li>This is a menu</li>
        </ul>
        <Label htmlFor="hamburger">Close Menu</Label>
      </Menu>
    </>
  );
};
