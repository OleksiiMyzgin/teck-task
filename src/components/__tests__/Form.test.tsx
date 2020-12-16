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

  describe('check process', () => {
    it('should alert number', () => {
      global.alert = jest.fn();
      const { getByTestId, getByRole } = render(
        <FormProvider>
          <Form />
        </FormProvider>,
      );

      const firstNumber = getByTestId('firstNumber').querySelector('input') as HTMLInputElement;
      const secondNumber = getByTestId('secondNumber').querySelector('input') as HTMLInputElement;
      const submitBtn = getByRole('button', { name: /Process/i});

      fireEvent.change(firstNumber, { target: { value: '1' } });
      fireEvent.change(secondNumber, { target: { value: '6' } });

      fireEvent.click(submitBtn);

      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith(2);
    });

    it('should alert test "Both values must be numbers"', () => {
      global.alert = jest.fn();
      const { getByTestId, getByRole } = render(
        <FormProvider>
          <Form />
        </FormProvider>,
      );

      const firstNumber = getByTestId('firstNumber').querySelector('input') as HTMLInputElement;
      const secondNumber = getByTestId('secondNumber').querySelector('input') as HTMLInputElement;
      const submitBtn = getByRole('button', { name: /Process/i});

      fireEvent.change(firstNumber, { target: { value: 'text' } });
      fireEvent.change(secondNumber, { target: { value: '6' } });

      fireEvent.click(submitBtn);

      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith("Both values must be numbers");
    });

    it('should alert test "Input can not be empty"', () => {
      global.alert = jest.fn();
      const { getByTestId, getByRole } = render(
        <FormProvider>
          <Form />
        </FormProvider>,
      );

      const firstNumber = getByTestId('firstNumber').querySelector('input') as HTMLInputElement;
      const secondNumber = getByTestId('secondNumber').querySelector('input') as HTMLInputElement;
      const submitBtn = getByRole('button', { name: /Process/i});

      fireEvent.change(firstNumber, { target: { value: '' } });
      fireEvent.change(secondNumber, { target: { value: '' } });

      fireEvent.click(submitBtn);

      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith("Input can not be empty");
    });
    it('should alert test "The number should be bigger than 0"', () => {
      global.alert = jest.fn();
      const { getByTestId, getByRole } = render(
        <FormProvider>
          <Form />
        </FormProvider>,
      );

      const firstNumber = getByTestId('firstNumber').querySelector('input') as HTMLInputElement;
      const secondNumber = getByTestId('secondNumber').querySelector('input') as HTMLInputElement;
      const submitBtn = getByRole('button', { name: /Process/i});

      fireEvent.change(firstNumber, { target: { value: '0' } });
      fireEvent.change(secondNumber, { target: { value: '5' } });

      fireEvent.click(submitBtn);

      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith("The number should be bigger than 0");
    });
  });

});
