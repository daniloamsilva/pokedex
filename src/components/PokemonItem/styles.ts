import styled from 'styled-components';

export const Container = styled.li`
  width: 100%;
  height: 205px;
  border-radius: 30px;
  padding: 25px 10px 30px 20px;
  list-style-type: none;
  background: #48d0b0;
  box-shadow: 0px 0px 15px -5px #595959;
`;

export const Index = styled.span`
  font-weight: 900;
  font-size: 25px;
  opacity: 0.5;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: bolder;
  font-size: 23px;
  margin-bottom: 15px;

  h3 {
    transform: translateY(10px);
  }
`;

export const Section = styled.section`
  display: flex;
  padding-bottom: 20px;
  height: 100%;

  li {
    border-radius: 20px;
    list-style-type: none;
    background-color: #61e0c9;
    color: #fff;
    font-size: 15px;
    font-weight: bolder;
    text-align: center;
    padding: 8px 25px;
    margin-bottom: 10px;
    transform: translateY(10px);
  }

  div {
    width: 100%;
    background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    transform: translateY(-10px);
  }
`;
