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

  &.dark-type {
    background-color: #757575;

    li {
      background-color: #9e9e9e;
    }
  }

  &.dragon-type {
    background-color: #ff7043;

    li {
      background-color: #ff8a65;
    }
  }

  &.electric-type {
    background-color: #ffce4b;

    li {
      background-color: #fbe068;
    }
  }

  &.fairy-type {
    background-color: #ffab91;

    li {
      background-color: #ffccbc;
    }
  }

  &.fighting-type {
    background-color: #ff7043;

    li {
      background-color: #ff8a65;
    }
  }

  &.fire-type {
    background-color: #fc6c6d;

    li {
      background-color: #fc7e7e;
    }
  }

  &.flying-type {
    background-color: #448aff;

    li {
      background-color: #82b1ff;
    }
  }

  &.ghost-type {
    background-color: #9575cd;

    li {
      background-color: #b39ddb;
    }
  }

  &.grass-type {
    background-color: #48d0b0;

    li {
      background-color: #61e0c9;
    }
  }

  &.ground-type {
    background-color: #ffa726;

    li {
      background-color: #ffb74d;
    }
  }

  &.ice-type {
    background-color: #64b5f6;

    li {
      background-color: #90caf9;
    }
  }

  &.normal-type {
    background-color: #90a4ae;

    li {
      background-color: #b0bec5;
    }
  }

  &.poison-type {
    background-color: #ba68c8;

    li {
      background-color: #ce93d8;
    }
  }

  &.psychic-type {
    background-color: #f06292;

    li {
      background-color: #f48fb1;
    }
  }

  &.rock-type {
    background-color: #a1887f;

    li {
      background-color: #bcaaa4;
    }
  }

  &.steel-type {
    background-color: #9e9e9e;

    li {
      background-color: #bdbdbd;
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
  margin-right: 10px;
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
    transform: translateY(5px);
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
