import styled, { css } from 'styled-components'

export const Container = styled.div`
  padding: 0 15px;

  @media (min-width: 768px) {
    padding: 30px;
  }

  @media (min-width: 992px) {
    padding: 30px 60px;
  }
`
export const Header = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 24px;
    font-weight: 400;
    margin: 0 0 20px 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    h1 {
      font-size: 32px;
      margin: 0;
    }
  }
  @media (min-width: 992px) {
    h1 {
      font-size: 36px;
    }
  }
`
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border-radius: 8px;
    width: calc(50% - 7px);
  }

  @media (min-width: 768px) {
    button {
      &:last-child {
        width: 165px;
        margin-left: 14px;
      }
    }
  }
`
export const SearchBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-top: 25px;
  input {
    max-width: 480px;
    border-radius: 8px;
    width: 100%;
    padding: 15px 50px 15px 20px;
  }

  svg {
    cursor: pointer;
    font-size: 30px;
    position: absolute;
    right: 15px;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`
export const ClientsListContainer = styled.div`
  margin-top: 25px;
  p {
    font-size: 24px;
    margin: 0;
  }
`
export const TableWrapper = styled.div`
  overflow: auto;
`
export const ClientsTable = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
  margin-top: 20px;
  border-top: 30px solid #F8F8F8;

  thead {
    th {
      padding: 20px 0;
      font-weight: 500;
      font-size: 16px;
      text-align: left;
      border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    }
  }
  tbody {
    tr:nth-child(2n) {
      background: rgba(217, 217, 217, 0.16);
    }
  }
`
export const ClientRow = styled.tr`
  cursor: pointer;
  &:hover {
    background: #F8F8F8;
  }
  td {
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    padding: 15px 0;
    font-size: 14px;
    line-height: 17px;

    &.status {
      text-transform: capitalize;
    }
  }
`
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`
export const StartDateSortContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 20px;
    margin-left: 5px;
    ${({ isASC }) => isASC && css`
      transform: rotate(180deg);
    `}
  }
`
