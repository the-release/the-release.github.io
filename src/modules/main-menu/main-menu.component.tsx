import React, { FC } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

import { GITHUB_URL, TWITTER_URL } from "../../config";
import { CloseMenuIcon } from "./close-menu-icon/close-menu-icon.component";
import { HamburgerIcon } from "./hamburger-icon/hamburger-icon.component";
import { TwitterIcon } from "./twitter-icon/twitter-icon.component";
import { GithubIcon } from "./github-icon/github-icon.component";

const Overlay = styled.label`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s;
`;

const Drawer = styled.nav(
  ({ theme }) => css`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    height: -webkit-fill-available;
    background: #000;
    transition: transform 0.4s;
    overflow: auto;
    overscroll-behavior-y: contain;

    min-width: 320px;
    color: #fff;
    outline: none;

    font-family: ${theme.fonts.sans};
  `
);

const Categories = styled.ul`
  list-style: none;
  font-size: 18px;
  font-weight: bold;
  margin: 20px 40px;

  &:hover {
    a {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  a {
    text-decoration: none;
    color: #fff;
    padding: 5px 0;
    display: block;
    transition: color 0.25s;

    &:hover {
      color: #fff;
    }
  }
`;

const Misc = styled.ul`
  list-style: none;
  font-size: 14px;
  margin: 20px 40px;

  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.6);
    padding: 5px 0;
    display: inline-block;

    &:hover {
      color: #fff;
    }
  }
`;

const SocialNetworks = styled.ul`
  list-style: none;
  margin: 20px 40px;
  display: flex;
  align-items: center;
  font-size: 0;

  a {
    display: block;
    opacity: 0.6;
    margin-right: 10px;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: -5px;
    }

    &:hover {
      opacity: 1;
    }
  }
`;

const OpenMenuButton = styled.label`
  display: block;
  cursor: pointer;
  font-size: 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    background: rgb(0, 0, 0, 0.25);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: -10px;
    border-radius: 100px;
    opacity: 0;
    transition: opacity 0.25s;
  }

  &:hover:after {
    opacity: 1;
  }
`;

const Checkbox = styled.input`
  position: absolute;
  pointer-events: none;
  opacity: 0;
  top: -100px;
  right: -100px;

  &:not(:checked) ~ ${Drawer} {
    transform: translateX(100%);
  }

  &:checked ~ ${Overlay} {
    opacity: 1;
    pointer-events: auto;
  }

  &:focus + ${OpenMenuButton}:after {
    opacity: 1;
  }
`;

const CloseMenuButton = styled.button`
  cursor: pointer;
  font-size: 0;
  background: none;
  border: none;
  -webkit-appearance: none;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, 0.25);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: -10px;
    border-radius: 100px;
    opacity: 0;
    transition: opacity 0.25s;
  }

  &:hover:after {
    opacity: 1;
  }
`;

const NavHead = styled.div`
  height: 81px;
  padding: 20px 40px;
  border-bottom: solid rgba(255, 255, 255, 0.15) 1px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 560px) {
    padding: 20px 30px;
  }

  @media only screen and (max-width: 320px) {
    padding: 20px;
  }
`;

const Category: FC<{
  href: string;
}> = ({ href, children }) => {
  return (
    <li>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
};

export const MainMenu: FC = () => {
  return (
    <form>
      <Checkbox id="hamburger" type="checkbox" />
      <OpenMenuButton htmlFor="hamburger">
        <HamburgerIcon /> Open Menu
      </OpenMenuButton>
      <Overlay htmlFor="hamburger" />
      <Drawer>
        <NavHead>
          <CloseMenuButton type="reset">
            <CloseMenuIcon />
            Close Menu
          </CloseMenuButton>
        </NavHead>
        <Categories>
          <Category href="/category/artificial-intelligence">AI</Category>
          <Category href="/category/politics">Politics</Category>
          <Category href="/category/privacy">Privacy</Category>
          <Category href="/category/security">Security</Category>
          <Category href="/category/startups">Startups</Category>
          <Category href="/category/silicon-valley">The Valley</Category>
        </Categories>
        <Misc>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              Contribute
            </a>
          </li>
        </Misc>
        <SocialNetworks>
          <li>
            <a href={TWITTER_URL} target="_blank" rel="noreferrer">
              <TwitterIcon /> Twitter
            </a>
          </li>
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              <GithubIcon /> GitHub
            </a>
          </li>
        </SocialNetworks>
      </Drawer>
    </form>
  );
};
