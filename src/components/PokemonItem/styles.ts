import styled, { css } from 'styled-components';

interface SectionProps {
  sprite: string;
}

export const Container = styled.li`
  width: 100%;
  height: 205px;
  border-radius: 30px;
  padding: 25px 10px 30px 20px;
  list-style-type: none;
  box-shadow: 0px 0px 15px -5px #595959;

  &.bug-type {
    background-color: #66bb6a;

    li {
      background-color: #81c784;
    }
  }

  &.fire-type {
    background-color: #fc6c6d;

    li {
      background-color: #fc7e7e;
    }
  }

  &.grass-type {
    background-color: #48d0b0;

    li {
      background-color: #61e0c9;
    }
  }

  &.normal-type {
    background-color: #90a4ae;

    li {
      background-color: #b0bec5;
    }
  }

  &.water-type {
    background-color: #76befe;

    li {
      background-color: #8fd1fd;
    }
  }
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

export const Section = styled.section<SectionProps>`
  display: flex;
  padding-bottom: 20px;
  height: 100%;

  li {
    border-radius: 20px;
    list-style-type: none;
    color: #fff;
    font-size: 15px;
    font-weight: bolder;
    text-align: center;
    padding: 8px 25px;
    margin-bottom: 10px;
    transform: translateY(10px);
  }

  div {
    ${props =>
      props.sprite &&
      css`
        background-image: url(${props.sprite});
      `}

    width: 100%;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    transform: translateY(-10px);
  }
`;
