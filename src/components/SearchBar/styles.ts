import styled from 'styled-components';
import { shade } from 'polished';

export const Form = styled.form`
  input {
    padding: 10px 20px;
    font-size: 17px;
    border: 1px solid white;
    border-right: none;
    float: left;
    width: 80%;
    background: #f1f1f1;
    border-radius: 20px 0 0 20px;
  }

  button {
    float: left;
    width: 20%;
    padding: 10px;
    color: white;
    font-size: 17px;
    border: 1px solid white;
    border-left: none;
    border-radius: 0 20px 20px 0;
    background-color: #30a7d7;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: ${shade(0.2, '#30a7d7')};
  }

  &::after {
    content: '';
    clear: both;
    display: table;
  }
`;
