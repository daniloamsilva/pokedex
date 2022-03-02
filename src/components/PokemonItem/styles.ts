import styled, { css } from 'styled-components';

import imgPokeball from '../../assets/pokeball.svg';

interface ContainerProps {
  type: string;
}

interface HeaderProps {
  nameLength: number;
}

interface SectionProps {
  sprite: string;
}

export const Container = styled.li<ContainerProps>`
  width: 100%;
  height: 205px;
  border-radius: 30px;
  padding: 25px 10px 30px 20px;
  list-style-type: none;
  box-shadow: 0px 0px 15px -5px #595959;
  background-image: url(${imgPokeball});
  background-repeat: no-repeat;
  background-size: 45%;
  background-position: bottom right;
  transition: 0.5s;
  background-color: ${props => `var(--color-${props.type}-type-dark)`};
  background-blend-mode: soft-light;

  &:hover {
    transform: translate(0, -10px);
    cursor: pointer;
  }
`;

export const Index = styled.span`
  font-weight: 900;
  font-size: 25px;
  opacity: 0.5;
  margin-right: 10px;
`;

export const Header = styled.header<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: bolder;
  font-size: 23px;
  margin-bottom: 15px;

  h3 {
    transform: translateY(5px);

    ${props =>
      props.nameLength > 12 &&
      css`
        font-size: 20px;
      `}
  }
`;

export const Section = styled.section<SectionProps>`
  display: flex;
  padding-bottom: 20px;
  height: 100%;

  ul {
    display: flex;
    flex-direction: column;
  }

  div#pokemon_image {
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
