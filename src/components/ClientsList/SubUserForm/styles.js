import styled from 'styled-components'

export const FormContainer = styled.form`
  h2 {
    font-size: 32px;
    margin-top: 0;
  }

  > button {
    margin: 40px 0 20px 0;
    width: 250px;
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
export const CompanyLogoContainer = styled.div`
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    p {
      margin: 0 20px;
    }
  }
`
export const CompanyLogoWrapper = styled.div`
  width: 200px;
  height: 100px;
  background-color: ${props => props.theme.colors.lightGray};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
export const ChooseFileContainer = styled.div`
  border: 1px dashed ${props => props.theme.colors.borderColor};
  border-radius: 5px;
  padding: 10px 20px;
`
