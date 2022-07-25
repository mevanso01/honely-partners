import styled from 'styled-components'

export const Container = styled.form`
  h1 {
    font-size: 32px;
    margin-top: 0;
    margin-bottom: 30px;
    font-weight: 400;
  }
`
export const FormController = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    font-size: 14px;
    margin: 8px;
  }
  input {
    min-width: 300px;
  }

  @media (min-width: 768px) {
    label {
      font-size: 18px;
    }
    input {
      min-width: 550px;
    }
  }
`
export const ValidationError = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 0;
  color: #FF735E;
  margin-top: 8px;

  svg {
    font-size: 16px;
    margin-right: 5px;
  }
`
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;

  > button:last-child {
    margin-left: 15px;
  }
`
