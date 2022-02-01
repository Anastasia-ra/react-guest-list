/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const flexDisplay = css`
  display: flex;
  justify-content: center;
  width: 50vw;
  margin-left: auto;
  margin-right: auto;
`;

export const inputFieldStyle = css`
  border-style: none;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px #dbdbdb;
  height: 30px;
  margin: 20px;
`;

export const addButtonStyle = css`
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
  height: 36px;
  font-size: 1rem;
  letter-spacing: 0.018rem;
  line-height: 1.269rem;
  :hover {
    background-color: rgb(6, 151, 110);
  }
`;

export const listItemStyle = css`
  list-style: none;
  display: flex;
  // flex-wrap: nowrap;
  justify-content: space-between;
  white-space: pre-wrap;
`;

export const attendingTextStyle = css`
  color: rgba(190, 190, 190);
`;

export const guestStyle = css`
  display: flex;
  min-width: 430px;
`;

export const inputStyle = css`
  position: absolute;
  left: 350px;
`;

export const guestListStyle = css`
  position: absolute;
  left: 610px;
`;

export const removeButtonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(251, 215, 215);
  border: none;
  transition: background-color 0.3s ease-in 0s;
  color: rgb(255, 255, 255);
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  cursor: pointer;
  padding: 4px 6px;
  // width: auto;
  height: 20px;
  font-size: 0.7rem;
  letter-spacing: 0.018rem;
  line-height: 1.269rem;
  // opacity: 0.2;
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
  :hover {
    background-color: rgb(225, 121, 121);
  }
`;

export const removeAllButtonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(216, 129, 129);
  border: none;
  transition: background-color 0.3s ease-in 0s;
  color: white;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 4px 6px;
  // width: auto;
  height: 36px;
  width: 140px;
  font-size: 0.8rem;
  letter-spacing: 0.018rem;
  line-height: 1.269rem;
  // opacity: 0.2;
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
  :hover {
    background-color: rgb(193, 79, 79);
  }
`;

export const checkBoxStyle = css`
  margin-top: auto;
  margin-bottom: auto;
`;
