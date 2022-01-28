/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const inputFieldStyle = css`
  border-style: none;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px #dbdbdb;
  height: 30px;
  margin: 20px;
`;

export const buttonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 188, 135);
  border: none;
  transition: background-color 0.3s ease-in 0s;
  color: rgb(255, 255, 255);
  font-weight: 600;
  font-family: 'proxima-nova', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 8px 12px;
  // width: auto;
  height: 36px;
  font-size: 1rem;
  letter-spacing: 0.018rem;
  line-height: 1.269rem;
  :hover {
    background-color: rgb(6, 151, 110);
  }
`;

export const listStyle = css`
  list-style: none;
`;

export const guestStyle = css`
  display: flex;
`;

export const appStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const inputGridStyle = css`
  grid-column-start: 1;
  grid-column-end: 2;
`;

export const guestListStyle = css`
  grid-column-start: 2;
  grid-column-end: 3;
`;

export const removeButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border: none;
  transition: background-color 0.3s ease-in 0s;
  color: rgb(255, 255, 255);
  font-weight: 600;
  font-family: 'proxima-nova', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 4px 6px;
  // width: auto;
  height: 20px;
  font-size: 0.7rem;
  letter-spacing: 0.018rem;
  line-height: 1.269rem;
  opacity: 0.5;
  :hover {
    background-color: rgb(139, 0, 0);
  }
`;
