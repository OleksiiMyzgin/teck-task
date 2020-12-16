import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';

import Form from '../Form';

const FormProvider = ({ children }: any) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

describe('Form tests', () => {
  it('render Form correctly', () => {
    const { getByTestId } = render(
      <FormProvider>
        <Form />
      </FormProvider>,
    );

    expect(getByTestId('form')).toBeInTheDocument();
  });

  it('check process', () => {
    global.alert = jest.fn();
    const { getByTestId, getByRole } = render(
      <FormProvider>
        <Form />
      </FormProvider>,
    );

    const firstNumber = getByTestId('firstNumber').querySelector('input') as HTMLInputElement;
    const secondNumber = getByTestId('secondNumber').querySelector('input') as HTMLInputElement;
    const submitBtn = getByRole('button', { name: /Process/i});

    expect(firstNumber).toBeInTheDocument();
    expect(secondNumber).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    fireEvent.change(firstNumber, { target: { value: '1' } });
    fireEvent.change(secondNumber, { target: { value: '6' } });

    fireEvent.click(submitBtn);

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith(2);
  });
});
