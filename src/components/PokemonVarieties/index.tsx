import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { capitalizeHelper } from '../../helpers/capitalize';
import { Select } from './stylse';

interface PokemonVarietiesProps {
  varieties: Variety[];
  selected: string;
}

interface Variety {
  pokemon: {
    name: string;
    url: string;
  };
}

export function PokemonVarieties({
  varieties,
  selected,
}: PokemonVarietiesProps) {
  const selectSelectedRef = useRef<HTMLDivElement>(null);
  const selectItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    selectSelectedRef.current?.addEventListener('click', () => {
      selectSelectedRef.current?.classList.toggle('select-arrow-active');
      selectItemsRef.current?.classList.toggle('select-hide');
    });

    document.addEventListener('click', e => {
      if (e.target !== selectSelectedRef.current) {
        selectSelectedRef.current?.classList.remove('select-arrow-active');
        selectItemsRef.current?.classList.add('select-hide');
      }
    });
  }, []);

  return (
    <Select>
      <div className="select-selected" ref={selectSelectedRef}>
        {capitalizeHelper(selected)}
      </div>
      <div className="select-items select-hide" ref={selectItemsRef}>
        {varieties.map(variety => (
          <div key={variety.pokemon.name} className="variety-option">
            <Link to={`/details/${variety.pokemon.name}`}>
              {capitalizeHelper(variety.pokemon.name)}
            </Link>
          </div>
        ))}
      </div>
    </Select>
  );
}
