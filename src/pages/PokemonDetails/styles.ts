import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  type: string;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${props => `var(--color-${props.type}-type-dark)`};

  .width_limit {
    max-width: 1200px;
    margin: 0 auto;
  }

  .icon_button {
    color: white;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, 'white')};
    }

    #arrow_left_icon {
      font-size: 25px;
    }

    #chevron_left_icon {
      margin-right: 10px;
    }

    #chevron_right_icon {
      margin-left: 10px;
    }
  }
`;

export const Nav = styled.nav`
  padding: 40px 20px 0 20px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

    li {
      margin-right: 5px;
    }
  }

  @media (max-width: 500px) {
    #infos {
      transform: translateY(15px);
    }

    .icon_button {
      display: none;
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
  justify-content: space-around;
  align-items: center;

  img {
    width: 55%;
  }

  .icon_button {
    display: none;
  }

  @media (max-width: 500px) {
    transform: translateY(35px);

    .icon_button {
      display: inline;
    }
  }
`;

export const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;

  #firstLine {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    margin-bottom: 10px;

    @media (max-width: 550px) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (max-width: 500px) {
      padding: 50px 10px;
    }
  }
`;

export const VarietySection = styled.section`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;
