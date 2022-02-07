import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0px 0px 15px -5px #595959;
  margin-top: 20px;
`;

export const EvoluationsWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  .arrow_left_icon {
    font-size: 50px;
    color: grey;
    align-self: center;
  }
`;

export const Stage = styled.div`
  align-self: center;

  display: grid;
  grid-gap: 10px;

  &#firstStage {
    display: inline;
  }

  &.evolves1 {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }

  &.evolves2 {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }

  &.evolves3 {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }

  &.evolves8 {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Evolution = styled.div`
  text-align: center;
  float: left;
  padding: 5px;

  img {
    width: 200px;
  }
`;
