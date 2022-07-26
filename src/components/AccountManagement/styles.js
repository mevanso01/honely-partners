import styled from 'styled-components'

export const Container = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 30px;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 26px;
      margin-bottom: 60px;
    }
  }

  @media (min-width: 1200px) {
    h1 {
      font-size: 32px;
    }
  }

  @media (min-width: 1440px) {
    h1 {
      font-size: 36px;
    }
  }
`
export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  button {
    font-weight: 700;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`
export const ManagementContainer = styled.div`
  flex: 1;
  padding: 0 15px;

  @media (min-width: 768px) {
    padding: 30px;
  }
  @media (min-width: 1024px) {
    border-right: 1px solid ${props => props.theme.colors.borderColor};
  }
  @media (min-width: 1200px) {
    padding: 30px 60px;
  }
`
export const LogoContainer = styled.div`
  flex: 1;
  padding: 50px 15px 30px 15px;

  @media (min-width: 768px) {
    padding: 30px;
  }
  @media (min-width: 1200px) {
    padding: 30px 60px;
  }
`
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    font-size: 16px;
    font-weight: 500;
  }
  p {
    font-size: 12px;
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    label {
      font-size: 20px;
    }
    p {
      font-size: 16px;
    }
  }
`
export const LogoWrapper = styled.div`
  width: 300px;
  height: 70px;
  background: #D9D9D9;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (min-width: 768px) {
    width: 380px;
    height: 90px;
  }
`
export const UploadButtonContainer = styled.div`
  margin: 50px 0;
  input[type='file'] {
    display: none;
  }
`
export const IntegrationCredentialsContainer = styled.div`
  padding: 30px 15px;

  @media (min-width: 768px) {
    padding: 30px;
  }
  @media (min-width: 1200px) {
    padding: 30px 60px;
  }
`
export const CredentialItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  label {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    align-items: center;
    button {
      padding: 10px;
    }
  }
  p {
    font-size: 14px;
  }

  input {
    flex: 1;
    max-width: 300px;
  }
`
export const SecretWrpper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 300px;

  input {
    padding-right: 28px;
  }

  svg {
    cursor: pointer;
    position: absolute;
    right: 5px;
    font-size: 20px;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`
