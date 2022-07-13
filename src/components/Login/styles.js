import styled from 'styled-components'

export const Container = styled.div`
`

export const InnerContainer = styled.div`
  width: 90%;
  margin: auto;
  padding: 45px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  p.description {
    font-size: 18px;
    text-align: center;
  }
`
export const Header = styled.div`
  display: flex;
`
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 150px;
    height: 54px;
    object-fit: contain;
  }
  span {
    font-size: 15px;
  }
`
export const FormContainer = styled.form`
  flex: 1;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 48px;
    margin-top: 0;
    margin-bottom: 80px;
    font-weight: 400;
  }

  button {
    font-size: 24px;
    font-weight: 700;
    height: 70px;
    width: 240px;
    margin-top: 70px;
  }
`
export const FormController = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    font-size: 18px;
    margin: 8px;
  }
  input {
    min-width: 550px;
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
export const NewPasswordContainer = styled.form`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 50px;
    width: 200px;
    font-size: 20px;
    height: 55px;
  }
`
