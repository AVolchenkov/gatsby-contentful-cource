import styled from 'styled-components'

export const MenuWrapper = styled.div`
  display: flex;
  margin: auto 0 auto auto;
`

export const MenuItem = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  line-height: 60px;
  a {
    color: #fff;
    &:hover {
      color: #999
    }
  }
`

export const SubMenuItemWrapper = styled.div`
  position: relative;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    > div:last-child {
      display: block;

    }
  }
  > div:last-child {
    position: absolute;
    display: none;
    top: 50px;
    z-index: 1;
    white-space: nowrap;
    background: #000;
    padding: 8px;
    border: 1px solid #999;
    box-shadow: 2px 2px 2px #000;
    > div {
      line-height: 1;
      padding: 8px 16px;
    }
  }
`

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`