import styled from 'styled-components';

export const Container = styled.li`
  width: 100%;
  height: 205px;
  border-radius: 30px;
  padding: 40px 15px 20px 25px;
  list-style-type: none;
  background: #48d0b0;
  position: relative;
  box-shadow: 0px 0px 15px -5px #595959;
`;

export const Index = styled.span`
  position: absolute;
  top: 20px;
  right: 25px;
  font-weight: 900;
  font-size: 25px;
  opacity: 0.08;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: bolder;
  font-size: 23px;
  margin-bottom: 15px;
`;

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

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
    z-index: 999;
  }

  img {
    width: 150px;
    position: absolute;
    bottom: 5px;
    right: 10px;
  }
`;
