import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DateTimePicker from '@react-native-community/datetimepicker';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Container, DateButton, DateText, Picker } from './styles';

const DateInput = ({ date, onChange }) => {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(() => {
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt });
  }, [date]);

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour
            display="default"
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt-br"
            onChange={(event, data) => onChange(data)}
          />
        </Picker>
      )}
    </Container>
  );
};

DateInput.propTypes = {
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date)]).isRequired,
  onChange: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default DateInput;
