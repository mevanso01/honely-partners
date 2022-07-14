import styled, { css } from 'styled-components'
import { darken } from 'polished'

export const PaginationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

export const PaginationButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

export const PageButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  font-size: 14px;
  color: ${props => props.theme.colors.headingColor};
  outline: none;
  border: none;
  border-radius: 27px;
  min-width: 27px;
  min-height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 7px;

  ${props => props.theme?.rtl ? css`
    margin-left: 3px;
  ` : css`
    margin-right: 3px;
  `}

  &:hover {
    background-color: #1507260a;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:active {
    background-color: #1507261a;
  }

  ${({ active }) => active && css`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.lightGray};
    &:hover {
      background: ${props => darken(0.04, props.theme.colors.primary)};
    }
    &:active {
      background: ${props => darken(0.1, props.theme.colors.primary)};
    }
  `}

  ${({ noEffect }) => noEffect && css`
    cursor: initial;
    &:hover {
      background-color: transparent;
    }
    &:active {
      background-color: transparent;
    }
  `}
`
