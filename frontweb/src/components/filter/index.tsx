import FlatPicker from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import flatpickrLib from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import './styles.css';
import React, { useState } from 'react';
import { FilterData, Gender } from '../../types';

flatpickrLib.localize(Portuguese);

type Props = {
  onFilterChange: (filter: FilterData) => void;
};

function Filter({ onFilterChange }: Props) {
  const [dates, setDates] = useState<Date[]>([]);
  const [gender, setGender] = useState<Gender>();

  const onChangeDate = (dates: Date[]) => {
    if (dates.length === 2) {
      setDates(dates);
      onFilterChange({ dates, gender });
    }
  };

  const onChangeGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectGender = event.target.value as Gender;
    setGender(selectGender);
    onFilterChange({ dates, gender: selectGender });
  };

  return (
    <header className="filter-container base-card">
      <FlatPicker
        className="filter-input"
        options={{
          mode: 'range',
          dateFormat: 'd/m/Y',
          showMonths: 2
        }}
        onChange={onChangeDate}
        placeholder="Selecione um período"
      />
      <select className="filter-input" onChange={onChangeGender}>
        <option value="">Selecione o gênero</option>
        <option value="MALE">Masculino</option>
        <option value="FEMALE">Feminino</option>
        <option value="OTHER">Outro</option>
      </select>
    </header>
  );
}

export default Filter;
