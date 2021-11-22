import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  type: string;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${props => `var(--color-${props.type}-type-dark)`};

  li {
    background-color: ${props => `var(--color-${props.type}-type-light)`};
  }

  .width_limit {
    max-width: 1200px;
    margin: 0 auto;
  }

  #back_button {
    color: white;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, 'white')};
    }

    #arrow_left_icon {
      font-size: 25px;
    }
  }
`;

export const Nav = styled.nav`
  padding: 40px 20px 0 20px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 20px;
  color: #fff;
  font-weight: bolder;
  font-size: 23px;

  @media (max-width: 500px) {
    display: block;
    justify-content: center;
    padding: 20px 20px 0 20px;
  }

  ul {
    display: flex;
  }

  li {
    border-radius: 20px;
    list-style-type: none;
    color: #fff;
    font-size: 15px;
    font-weight: bolder;
    text-align: center;
    padding: 8px 25px;
    margin: 10px 0;

    & + li {
      margin-left: 10px;
    }
  }

  @media (max-width: 500px) {
    #infos {
      transform: translateY(15px);
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;

  h1 {
    margin-right: 30px;
  }

  span {
    font-size: 20px;
  }

  @media (max-width: 500px) {
    justify-content: space-between;

    h1 {
      font-size: 40px;
    }
  }
`;

export const PokemonImage = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 200px;
  }

  @media (max-width: 500px) {
    transform: translateY(35px);
  }
`;
