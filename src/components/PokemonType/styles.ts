import styled from 'styled-components';

interface PokemonType {
  type: string;
}

export const Type = styled.li<PokemonType>`
  list-style-type: none;
  border-radius: 20px;
  list-style-type: none;
  color: #fff;
  font-size: 15px;
  font-weight: bolder;
  text-align: center;
  padding: 8px 20px;
  margin-bottom: 10px;
  transform: translateY(10px);
  background-color: ${props => `var(--color-${props.type}-type-light)`};
`;
