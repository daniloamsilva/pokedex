import styled from 'styled-components';

export const Select = styled.div`
  width: 300px;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 650px) {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 0px;
  }

  .select-selected {
    background-color: #313131;
  }

  /* Style the arrow inside the select element: */
  .select-selected:after {
    position: absolute;
    content: '';
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }

  /* Point the arrow upwards when the select box is open (active): */
  .select-selected.select-arrow-active:after {
    border-color: transparent transparent #fff transparent;
    top: 7px;
  }

  /* style the items (options), including the selected item: */
  .select-items div,
  .select-selected {
    color: #ffffff;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
    cursor: pointer;
  }

  /* Style items (options): */
  .select-items {
    margin-top: -30px;
    width: 300px;
    position: absolute;
    background-color: #616161;
    top: 100%;
    right: 0;
    z-index: 99;

    @media (max-width: 650px) {
      width: 100%;
      margin-top: 0px;
    }
  }

  /* Hide the items when the select box is closed: */
  .select-hide {
    display: none;
  }

  .select-items div:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .select-items a {
    color: white;
    text-decoration: none;
  }
`;
