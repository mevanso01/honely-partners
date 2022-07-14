
import styled, { css } from 'styled-components'
import { darken } from 'polished'

export const IconButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  height: 32px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s ease-in;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  > svg {
    width: 20px;
    height: 20px;
    color: #B1BCCC;
  }

  &:hover {
    background-color: #1507260a;

    > svg {
      color:  #151b26;
    }
  }

  &:active {
    background-color: #1507261a;
  }

  ${({ color }) => color === 'black' && css`
    > svg {
      color: ${props => props.theme.colors.headingColor};
    }
    &:hover {
      background-color: ${props => props.theme.colors.lightGray};
    }
    &:active {
      background-color: #E9ECEF;
    }

    ${({ active }) => active && css`
      background-color: #E9ECEF;
    `}
  `}

  ${({ color }) => color === 'primary' && css`
    > svg {
      color: ${props => props.theme.colors.primary};
    }
    &:hover {
      background-color: #1507260a;
      > svg {
        color: ${props => props.theme.colors.primary};
      }
    }
  `}
  ${({ isDisabled }) => isDisabled && css`
    pointer-events: none;
  `}
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #CCC;
  color: #FFF;
  border: 1px solid #CCC;
  border-radius: ${({ borderRadius }) => !borderRadius ? '12px' : borderRadius};
  padding: 11px 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all .2s ease-in;

  &:active {
    background: ${() => darken(0.07, '#CCC')};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ bgtransparent }) => bgtransparent && css`
    background: transparent !important;
    border: 1px solid ${props => props.theme.colors.buttonBorder};
  `}
  ${({ outline }) => outline && css`
    background: #FFF;
    color: #CCC;
    border-color: #CCC;
    &:active {
      color: #FFF;
      background: ${darken(0.07, '#CCC')};
    }
    &:hover {
      background: ${darken(0.07, '#CCC')};
      color: #FFF;
    }
  `}
  ${({ circle }) => circle && css`
    background: #CCC;
    color: #FFF;
    border-color: #CCC;
    padding: 0;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-radius: 50%;
    &:active {
      color: #FFF;
      background: ${darken(0.07, '#CCC')};
    }
  `}
  ${({ circle, outline }) => circle && outline && css`
    background: #FFF;
    color: #CCC;
    border-color: #CCC;
    padding: 0;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-radius: 50%;
    &:active {
      color: #FFF;
      background: ${darken(0.07, '#CCC')};
    }
  `}

  ${({ color }) => color === 'primary' && css`
    display: flex;
    align-items: center;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primary};
    &:hover {
      background: ${props => darken(0.04, props.theme.colors.primary)};
    }
    &:active {
      background: ${props => darken(0.1, props.theme.colors.primary)};
    }
  `}

  ${({ color }) => color === 'black' && css`
    display: flex;
    align-items: center;
    background: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.black};
    &:hover {
      background: ${props => darken(0.04, props.theme.colors.black)};
    }
    &:active {
      background: ${props => darken(0.1, props.theme.colors.black)};
    }
    ${({ outline }) => outline && css`
      background: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.black};
      border-color: ${props => props.theme.colors.black};
      &:active {
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.black};
      }
      &:hover {
        background: ${props => darken(0.07, props.theme.colors.black)};
        color: ${props => props.theme.colors.white};
      }
    `}
  `}
`