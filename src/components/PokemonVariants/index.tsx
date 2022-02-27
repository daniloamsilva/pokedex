import { useEffect, useRef } from 'react';
import { Select } from './stylse';

export function PokemonVariants() {
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
        Venusaur
      </div>
      <div className="select-items select-hide" ref={selectItemsRef}>
        <div className="variant-option">Venusaur</div>
        <div className="variant-option">Mega Venusaur</div>
        <div className="variant-option">Gigantamax Venusaur</div>
      </div>
    </Select>
  );
}
