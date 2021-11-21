import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  type: string;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${props => `var(--color-${props.type}-type-dark)`};

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

export const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;
