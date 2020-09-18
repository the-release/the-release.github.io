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
  right: 0;
  left: 0;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s;
`;

const Drawer = styled.nav(
  ({ theme }) => css`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    height: -webkit-fill-available;
    background: #000;
    transition: transform 0.35s;
    overflow: auto;
    overscroll-behavior-y: contain;
    width: 100%;
    max-width: 560px;
    color: #fff;
    font-family: ${theme.fonts.sans};
  `
);

/**
 * We're using a separate element for the Drawer's background
 * because of a bug in iOS Safari where the height of the Drawer
 * does not resize gracefully when scrolling */
const Pane = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  background: #000;
  transition: transform 0.35s;
  width: 100%;
  max-width: 560px;
`;

const Categories = styled.ul(
  ({ theme }) => css`
    ${theme.typography.h2};
    list-style: none;
    margin: 20px 40px;

    &:hover {
      a {
        color: rgba(255, 255, 255, 0.6);
      }
    }

    a {
      text-decoration: none;
      color: #fff;
      display: block;
      transition: color 0.25s;

      &:focus,
      &:hover {
        color: #fff;
      }
    }

    @media only screen and (max-width: 560px) {
      margin: 20px 30px;
      font-size: 36px;
    }

    @media only screen and (max-width: 320px) {
      margin: 20px;
    }
  `
);

const Misc = styled.ul(
  ({ theme }) => css`
    ${theme.typography.h4};
    list-style: none;
    margin: 20px 40px;
    font-weight: normal;

    a {
      text-decoration: none;
      color: rgba(255, 255, 255, 0.6);
      padding: 5px 0;
      display: inline-block;

      &:focus,
      &:hover {
        color: #fff;
      }
    }

    @media only screen and (max-width: 560px) {
      margin: 20px 30px;
    }

    @media only screen and (max-width: 320px) {
      margin: 20px;
    }
  `
);

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

    &:focus,
    &:hover {
      opacity: 1;
    }
  }

  @media only screen and (max-width: 560px) {
    margin: 20px 30px;
  }

  @media only screen and (max-width: 320px) {
    margin: 20px;
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
  top: 0;
  right: 0;

  &:not(:checked) ~ ${Drawer}, &:not(:checked) ~ ${Pane} {
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
      <Link href="/category/[slug]" as={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
};

export const MainMenu = () => {
  return {
    toggleButton: (
      <OpenMenuButton htmlFor="main-menu-checkbox">
        <HamburgerIcon /> Open Menu
      </OpenMenuButton>
    ),
    drawer: (
      <form>
        <Checkbox id="main-menu-checkbox" type="checkbox" />
        <Overlay htmlFor="main-menu-checkbox" />
        <Pane />
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
    )
  };
};
