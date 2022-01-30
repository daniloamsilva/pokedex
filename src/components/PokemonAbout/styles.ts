import styled from 'styled-components';

export const Container = styled.section`
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0px 0px 15px -5px #595959;

  table {
    width: 100%;
    table-layout: auto;
    margin-top: 15px;

    td {
      padding: 10px 0;
    }

    td.feature_name {
      font-weight: bold;
      color: grey;
      vertical-align: top;
    }

    td.feature_value {
      padding: 0 20px;
      font-weight: bold;
      font-size: 18px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-right: 5px;
      }
    }
  }
`;
