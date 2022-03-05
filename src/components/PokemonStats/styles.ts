import styled from 'styled-components';

interface StatBarProps {
  percentage: number;
  type: string;
}

export const Container = styled.section`
  width: 100%;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0px 0px 15px -5px #595959;

  @media (max-width: 500px) {
    padding: 20px;
  }

  table {
    width: 100%;
    table-layout: auto;
    margin-top: 15px;

    td {
      padding: 10px 0;
    }

    td.stat_name {
      font-weight: bold;
      color: grey;
    }

    td.stat_value {
      padding: 0 20px;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
    }

    td.stat_bar {
      width: 100%;

      div.stat_bar_background {
        width: 100%;
        border-radius: 10px;
        background-color: #e3e3e3;
      }
    }
  }
`;

export const StatBar = styled.div<StatBarProps>`
  border-radius: 10px;
  background-color: ${props => `var(--color-${props.type}-type-dark)`};
  width: ${props => `${props.percentage}%`};
  height: 100%;
  color: ${props => `var(--color-${props.type}-type-dark)`};
`;
