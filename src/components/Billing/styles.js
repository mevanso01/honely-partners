import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 15px;
  height: 100%;
  position: relative;

  h1 {
    font-size: 24px;
    font-weight: 400;
    margin: 0;
  }

  @media (min-width: 768px) {
    padding: 30px;
    h1 {
      font-size: 32px;
    }
  }

  @media (min-width: 992px) {
    padding: 30px 60px;
    h1 {
      font-size: 36px;
    }
  }
`
export const MainContent = styled.div`
  filter: blur(12px);
`
export const ContactMessage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-weight: 600;
  text-align: center;
  line-height: 24px;
  font-size: 18px;
`
export const CardsContainer = styled.div`
  margin: 30px 0 50px 0;
  > p {
    font-size: 20px;
    margin: 0 0 10px 0;
  }
  button {
    font-weight: 700;
  }
  @media (min-width: 768px) {
    margin: 50px 0;
    > p {
      font-size: 24px;
    }
  }
`
export const CardsList = styled.div`
  margin-bottom: 30px;
  @media (min-width: 768px) {
    margin-bottom: 50px;
  }
`
export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  span {
    font-size: 16px;
    &.brand {
      margin-right: 35px;
    }
  }
`
export const PaymentHistoryContainer = styled.div`
 > p {
    font-size: 20px;
    margin: 0 0 24px 0;
  }
  @media (min-width: 768px) {
    > p {
      font-size: 24px;
    }
  }
`
export const PaymentHistoryTableWrapper = styled.div`
  overflow: auto;
  border-top: 30px solid #F8F8F8;

  table {
    width: 100%;
    max-width: 750px;
    min-width: 550px;
    border-collapse: collapse;
    margin: 15px 0;

    thead {
      th {
        padding: 5px 0;
        font-weight: 500;
        font-size: 16px;
        text-align: left;
      }
    }
    tbody {
      td {
        padding: 15px 0;
        font-size: 14px;
        border-bottom: 1px solid ${props => props.theme.colors.borderColor};
      }
    }
  }
`
